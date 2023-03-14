import './playField.scss'

type SquarePropsType = {
  row: number
  column: number
  blockClassName: string
  hoveredSquares: string[]
}

const Square = ({ row, column, blockClassName, hoveredSquares }: SquarePropsType) => {
  const squareId = `row ${row} col ${column}`
  const isSquareHovered = hoveredSquares.includes(squareId)
  return (
    <div
      id={squareId}
      className={isSquareHovered ? `${blockClassName} ${blockClassName}-hover` : blockClassName}
    />
  )
}

export default Square