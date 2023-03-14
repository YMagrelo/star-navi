import React, { ChangeEvent } from 'react'
import './modePicker.scss'
import { ModeType } from '../../types'
import useModes from '../../hooks/modes'

type ModePickerPropsType = {
  currentMode: ModeType | undefined
  changeModeHandler: (event: ChangeEvent<HTMLSelectElement>) => void
  modes: Array<ModeType>
  activeGameHandler: () => void
  isGameActive: boolean
}

const ModePicker = (props: ModePickerPropsType) => {
  const { currentMode, changeModeHandler, modes, activeGameHandler, isGameActive } = props
  const { isLoading } = useModes()
  const isStartGameEnabled = Boolean(!isLoading && currentMode?.field)
  const buttonClassName = isStartGameEnabled
    ? 'modePicker_button'
    : 'modePicker_button modePicker_button-disabled'
  return (
    <div className='modePicker'>
      <select
        name='modePicker'
        value={currentMode?.name || ''}
        className='modePicker_select'
        onChange={changeModeHandler}
      >
        <option value='' disabled>
          {isLoading ? 'Loading...' : 'Pick mode'}
        </option>
        {modes.map((mode) => (
          <option key={mode.id} value={mode.name}>
            {mode.name}
          </option>
        ))}
      </select>
      <button
        className={buttonClassName}
        onClick={activeGameHandler}
        disabled={!isStartGameEnabled}
      >
        {isGameActive ? 'stop' : 'start'}
      </button>
    </div>
  )
}

export default ModePicker
