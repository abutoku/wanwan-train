import { create } from 'zustand'
import { N } from './data/yamanote'

export const STEP_MS = 900 // 1駅ぶんの走行時間
export const HOP_PAUSE_MS = 250 // タップ移動時の駅間ポーズ
export const AUTO_DWELL_MS = 1800 // 再生中の停車時間

export type Screen = 'title' | 'game'
// outer = 外回り(時計回り) / inner = 内回り(反時計回り)
export type Direction = 'outer' | 'inner'

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export const directionDelta = (d: Direction) => (d === 'outer' ? 1 : -1)

// from から to まで、方向 d で進んだときの駅数
export const stopsBetween = (from: number, to: number, d: Direction) =>
  d === 'outer' ? (to - from + N) % N : (from - to + N) % N

// タップ移動ループの多重起動ガード
let travelActive = false

interface GameState {
  screen: Screen
  direction: Direction
  currentIndex: number // 停車中=現在駅 / 走行中=次に着く駅
  isMoving: boolean
  isPlaying: boolean // 再生（自動で進む）中か
  destinationIndex: number | null
  arrivedIndex: number | null // 到着演出用

  startGame: () => void
  backToTitle: () => void
  setDirection: (direction: Direction) => void
  togglePlay: () => void
  stepForward: () => Promise<void>
  stepBackward: () => Promise<void>
  travelTo: (target: number) => void
  _hop: (delta: 1 | -1) => Promise<void>
  _runTravel: () => Promise<void>
}

export const useGame = create<GameState>((set, get) => ({
  screen: 'title',
  direction: 'outer',
  currentIndex: 0, // 東京駅スタート
  isMoving: false,
  isPlaying: false,
  destinationIndex: null,
  arrivedIndex: null,

  startGame: () => set({ screen: 'game' }),

  backToTitle: () => {
    if (!get().isMoving) set({ screen: 'title', isPlaying: false, arrivedIndex: null })
  },

  setDirection: (direction) => {
    if (!get().isMoving) set({ direction })
  },

  togglePlay: () => set({ isPlaying: !get().isPlaying }),

  _hop: async (delta) => {
    set({ currentIndex: (get().currentIndex + delta + N) % N })
    await sleep(STEP_MS)
  },

  stepForward: async () => {
    if (get().isMoving) return
    set({ isMoving: true, arrivedIndex: null })
    await get()._hop(directionDelta(get().direction))
    set({ isMoving: false })
    // 走行中に駅がタップされていたら、そのままタップ移動を開始
    if (get().destinationIndex != null) void get()._runTravel()
  },

  // 選択中の方向と逆向きに1駅もどる（方向設定は変えない）
  stepBackward: async () => {
    if (get().isMoving) return
    set({ isMoving: true, arrivedIndex: null })
    await get()._hop(directionDelta(get().direction) === 1 ? -1 : 1)
    set({ isMoving: false })
    if (get().destinationIndex != null) void get()._runTravel()
  },

  // 駅タップ: いつでも受付。走行中なら目的地を差し替えて続行する
  travelTo: (target) => {
    if (target === get().currentIndex) return
    set({ destinationIndex: target, arrivedIndex: null })
    if (!get().isMoving) void get()._runTravel()
  },

  _runTravel: async () => {
    if (travelActive) return
    travelActive = true
    set({ isMoving: true })

    while (get().destinationIndex != null && get().currentIndex !== get().destinationIndex) {
      await get()._hop(directionDelta(get().direction) as 1 | -1)
      if (get().destinationIndex != null && get().currentIndex !== get().destinationIndex) {
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
