import React, { ChangeEvent, useState, useEffect } from 'react'
import ModePicker from './components/modePicker/ModePicker'
import PlayField from './components/playField/PlayField'
import HoverList from './components/hoverList/HoverList'
import './app.scss'
import { ModeType } from './types'
import useModes from './hooks/modes'

const hoverSquaresList: Array<string> = ['row 2 col 1', 'row 2 col 2', 'row 2 col 3', 'row 3 col 3']

function App() {
  const [currentMode, setCurrentMode] = useState<ModeType | undefined>({} as ModeType)
  const [isGameActive, setIsGameActive] = useState(false)
  const [hoveredSquares, setHoveredSquares] = useState<string[]>([])
  const { modes } = useModes()

  const changeModeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newCurrentMode = modes.find((mode) => mode.name === event.target.value)
    setHoveredSquares([])
    setIsGameActive(false)
    setCurrentMode(newCurrentMode)
  }

  const squareHoverHandler = (event: any) => {
    const hoveredSquareId = event.target.id

    if (isGameActive && hoveredSquareId && !hoveredSquares.includes(hoveredSquareId)) {
      setHoveredSquares((prev) => [...prev, hoveredSquareId])
    } else if (hoveredSquares.includes(hoveredSquareId)) {
      const filteredSquares = hoveredSquares.filter((square) => square !== hoveredSquareId)
      setHoveredSquares(filteredSquares)
    }
  }

  const activeGameHandler = () => {
    setIsGameActive((prev) => !prev)
  }

  return (
    <div className='app'>
      <div>
        <ModePicker
          currentMode={currentMode}
          changeModeHandler={changeModeHandler}
          modes={modes}
          activeGameHandler={activeGameHandler}
          isGameActive={isGameActive}
        />
        <PlayField
          currentMode={currentMode}
          isGameActive={isGameActive}
          squareHoverHandler={squareHoverHandler}
          hoveredSquares={hoveredSquares}
        />
      </div>
      <HoverList hoveredSquares={hoveredSquares} />
    </div>
  )
}

export default App
