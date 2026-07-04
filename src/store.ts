import { create } from 'zustand'
import { RIDEABLE, baseServiceId, type RideableLineId } from './data/rideable'
import type { RideableLine } from './data/types'

export const STEP_MS = 900 // 1駅ぶんの走行時間
export const HOP_PAUSE_MS = 250 // タップ移動時の駅間ポーズ
export const AUTO_DWELL_MS = 1800 // 再生中の停車時間

export type Screen = 'title' | 'game'
// fwd = インデックス +1 方向（山手線: 外回り=時計回り / 直線路線: 駅番号が増える方向）
export type Direction = 'fwd' | 'rev'

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export const directionDelta = (d: Direction) => (d === 'fwd' ? 1 : -1)

// from から to まで、方向 d で進んだときの駅数（直線路線で逆方向なら null = 到達不能）
export function stopsBetween(from: number, to: number, d: Direction, line: RideableLine) {
  const n = line.stations.length
  if (line.loop) return d === 'fwd' ? (to - from + n) % n : (from - to + n) % n
  const diff = d === 'fwd' ? to - from : from - to
  return diff >= 0 ? diff : null
}

// 直線路線で方向 d の終点に到達しているか
export const atTerminus = (index: number, d: Direction, line: RideableLine) =>
  !line.loop && (d === 'fwd' ? index === line.stations.length - 1 : index === 0)

// タップ移動ループの多重起動ガード
let travelActive = false

interface GameState {
  screen: Screen
  lineId: RideableLineId
  direction: Direction
  currentIndex: number // 停車中=現在駅 / 走行中=次に着く駅
  isMoving: boolean
  isPlaying: boolean // 再生（自動で進む）中か
  destinationIndex: number | null
  arrivedIndex: number | null // 到着演出用
  transferFlash: boolean // 乗り換え直後の演出用
  serviceId: string | null // 停車駅ビューで選択中の種別（種別のない路線は null）

  startGame: (start?: { lineId: RideableLineId; index: number }) => void
  backToTitle: () => void
  setDirection: (direction: Direction) => void
  setService: (serviceId: string) => void
  togglePlay: () => void
  stepForward: () => Promise<void>
  stepBackward: () => Promise<void>
  travelTo: (target: number) => void
  transferTo: (lineId: RideableLineId, index: number) => void
  _hop: (delta: 1 | -1) => Promise<void>
  _runTravel: () => Promise<void>
}

export const useGame = create<GameState>((set, get) => ({
  screen: 'title',
  lineId: 'yamanote',
  direction: 'fwd',
  currentIndex: 0, // 東京駅スタート
  isMoving: false,
  isPlaying: false,
  destinationIndex: null,
  arrivedIndex: null,
  transferFlash: false,
  serviceId: null,

  // タイトルで選んだ駅からスタート（未指定なら山手線・東京駅）。方向は選び直してもらう
  startGame: (start) => {
    const lineId = start?.lineId ?? 'yamanote'
    set({
      screen: 'game',
      lineId,
      currentIndex: start?.index ?? 0,
      direction: 'fwd',
      serviceId: baseServiceId(RIDEABLE[lineId]),
    })
  },

  backToTitle: () => {
    if (get().isMoving) return
    // タイトルに戻ったら山手線・東京駅スタートに戻す
    set({
      screen: 'title',
      lineId: 'yamanote',
      direction: 'fwd',
      currentIndex: 0,
      isPlaying: false,
      destinationIndex: null,
      arrivedIndex: null,
      transferFlash: false,
      serviceId: null,
    })
  },

  setDirection: (direction) => {
    if (!get().isMoving) set({ direction })
  },

  setService: (serviceId) => set({ serviceId }),

  togglePlay: () => set({ isPlaying: !get().isPlaying }),

  _hop: async (delta) => {
    const line = RIDEABLE[get().lineId]
    const n = line.stations.length
    const next = line.loop
      ? (get().currentIndex + delta + n) % n
      : Math.max(0, Math.min(n - 1, get().currentIndex + delta))
    set({ currentIndex: next })
    await sleep(STEP_MS)
  },

  stepForward: async () => {
    const { isMoving, direction, currentIndex, lineId } = get()
    if (isMoving) return
    // 直線路線の終点ではそれ以上進めない（再生中なら自動停止）
    if (atTerminus(currentIndex, direction, RIDEABLE[lineId])) {
      set({ isPlaying: false })
      return
    }
    set({ isMoving: true, arrivedIndex: null, transferFlash: false })
    await get()._hop(directionDelta(direction))
    set({ isMoving: false })
    // 走行中に駅がタップされていたら、そのままタップ移動を開始
    if (get().destinationIndex != null) void get()._runTravel()
  },

  // 選択中の方向と逆向きに1駅もどる（方向設定は変えない）
  stepBackward: async () => {
    const { isMoving, direction, currentIndex, lineId } = get()
    if (isMoving) return
    const back: Direction = direction === 'fwd' ? 'rev' : 'fwd'
    if (atTerminus(currentIndex, back, RIDEABLE[lineId])) return
    set({ isMoving: true, arrivedIndex: null, transferFlash: false })
    await get()._hop(directionDelta(back))
    set({ isMoving: false })
    if (get().destinationIndex != null) void get()._runTravel()
  },

  // 駅タップ: いつでも受付。走行中なら目的地を差し替えて続行する。
  // 直線路線は目的地への方向が一意なので、方向も自動で切り替える
  travelTo: (target) => {
    const { currentIndex, lineId } = get()
    if (target === currentIndex) return
    const line = RIDEABLE[lineId]
    const patch: Partial<GameState> = {
      destinationIndex: target,
      arrivedIndex: null,
      transferFlash: false,
    }
    if (!line.loop) patch.direction = target > currentIndex ? 'fwd' : 'rev'
    set(patch)
    if (!get().isMoving) void get()._runTravel()
  },

  // 乗り換え: 停車中のみ。路線と現在駅を切り替え、方向は選び直してもらう
  transferTo: (lineId, index) => {
    if (get().isMoving) return
    set({
      lineId,
      currentIndex: index,
      direction: 'fwd',
      isPlaying: false,
      destinationIndex: null,
      arrivedIndex: null,
      transferFlash: true,
      serviceId: baseServiceId(RIDEABLE[lineId]),
    })
    setTimeout(() => {
      if (get().transferFlash) set({ transferFlash: false })
    }, 2200)
  },

  _runTravel: async () => {
    if (travelActive) return
    travelActive = true
    set({ isMoving: true })

    while (get().destinationIndex != null && get().currentIndex !== get().destinationIndex) {
      await get()._hop(directionDelta(get().direction) as 1 | -1)
      if (get().destinationIndex != null && get().currentIndex !== get().destinationIndex) {
        // 直線路線で終点に達したのに目的地に届かない場合は打ち切り（通常は起こらない）
        if (atTerminus(get().currentIndex, get().direction, RIDEABLE[get().lineId])) break
        await sleep(HOP_PAUSE_MS)
      }
    }

    const target = get().destinationIndex
    const arrived = target != null && get().currentIndex === target
    travelActive = false
    set({ isMoving: false, destinationIndex: null, arrivedIndex: arrived ? target : null })
    if (arrived) {
      setTimeout(() => {
        if (get().arrivedIndex === target) set({ arrivedIndex: null })
      }, 2200)
    }
  },
}))
