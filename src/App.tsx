import { useGame } from './store'
import { TitleScreen } from './components/TitleScreen'
import { GameScreen } from './components/GameScreen'

export default function App() {
  const screen = useGame((s) => s.screen)
  return screen === 'title' ? <TitleScreen /> : <GameScreen />
}
