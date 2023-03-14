import './playField.scss'
import { ModeType } from '../../types'
import { DEFAULT_ROWS_NUMBER } from '../../constants'
import Square from './Square'

type PlayFieldPropsType = {
  currentMode: ModeType | undefined
  isGameActive: boolean
  squareHoverHandler: (event: any) => void
  hoveredSquares: string[]
}

const PlayField = ({
  currentMode,
  isGameActive,
  squareHoverHandler,
  hoveredSquares,
}: PlayFieldPropsType) => {
  const rowsNumber = !currentMode?.field ? DEFAULT_ROWS_NUMBER : currentMode.field
  const rowsNumberList = Array.from({ length: rowsNumber }, (_: number, i: number) => i + 1)

  const playFieldClassName = isGameActive ? 'playField-active' : 'playField'
  const blockClassName = isGameActive ? 'playField-active_block' : 'playField_block'

  return (
    <div className={playFieldClassName} onMouseOver={squareHoverHandler}>
      {rowsNumberList.map((row, i) => (
        <div key={i} className='playField_row'>
          {rowsNumberList.map((column, j) => (
            <Square
              row={row}
              column={column}
              blockClassName={blockClassName}
              hoveredSquares={hoveredSquares}
              key={j}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default PlayField
