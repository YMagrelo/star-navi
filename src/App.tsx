import React, { ChangeEvent, useState, MouseEvent, useCallback } from 'react'
import { MemorizedModePicker } from './components/modePicker/ModePicker'
import PlayField from './components/playField/PlayField'
import { MemorizedHoverList } from './components/hoverList/HoverList'
import './app.scss'
import { ModeType } from './types'
import useModes from './hooks/modes'

function App() {
  const [currentMode, setCurrentMode] = useState<ModeType | undefined>({} as ModeType)
  const [isGameActive, setIsGameActive] = useState(false)
  const [hoveredSquares, setHoveredSquares] = useState<string[]>([])
  const { modes } = useModes()

  const changeModeHandlerCallback = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newCurrentMode = modes.find((mode) => mode.name === event.target.value)
      setHoveredSquares([])
      setIsGameActive(false)
      setCurrentMode(newCurrentMode)
    },
    [isGameActive, currentMode, modes],
  )

  const squareHoverHandler = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement
    const hoveredSquareId = target.id

    if (isGameActive && hoveredSquareId && !hoveredSquares.includes(hoveredSquareId)) {
      setHoveredSquares((prev) => [...prev, hoveredSquareId])
    } else if (hoveredSquares.includes(hoveredSquareId)) {
      const filteredSquares = hoveredSquares.filter((square) => square !== hoveredSquareId)
      setHoveredSquares(filteredSquares)
    }
  }

  const activeGameHandlerCallBack = useCallback(() => {
    setIsGameActive((prev) => !prev)
  }, [isGameActive])

  return (
    <div className='app'>
      <div>
        <MemorizedModePicker
          currentMode={currentMode}
          changeModeHandler={changeModeHandlerCallback}
          modes={modes}
          activeGameHandler={activeGameHandlerCallBack}
          isGameActive={isGameActive}
        />
        <PlayField
          currentMode={currentMode}
          isGameActive={isGameActive}
          squareHoverHandler={squareHoverHandler}
          hoveredSquares={hoveredSquares}
        />
      </div>
      <MemorizedHoverList hoveredSquares={hoveredSquares} />
    </div>
  )
}

export default App
