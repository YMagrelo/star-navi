import './howerList.scss'
import React from 'react'

type HoveredSquaresPropsType = {
  hoveredSquares: string[]
}

const HoverList = ({ hoveredSquares }: HoveredSquaresPropsType) => {
  return (
    <div className='hoverSquares'>
      <h2 className='hoverSquares_title'>Hover squares</h2>
      <div className='hoverSquares_list'>
        {hoveredSquares.map((square) => (
          <div className='hoverSquares_line' key={square}>
            {square}
          </div>
        ))}
      </div>
    </div>
  )
}

export const MemorizedHoverList = React.memo(HoverList)
