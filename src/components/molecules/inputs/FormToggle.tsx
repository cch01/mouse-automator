import { Toggle } from 'components/atoms/Toggle'
import React from 'react'

interface FormToggleProps {
  description: string
  value: boolean
  onToggle: (val?: boolean) => void
  disabled?: boolean
}

export const FormToggle: React.FC<FormToggleProps> = ({
  description,
  onToggle,
  value,
  disabled
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-base text-secondary">{description}</div>
      <Toggle disabled={disabled} onToggle={onToggle} value={value} />
    </div>
  )
}
