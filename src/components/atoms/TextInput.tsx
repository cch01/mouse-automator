import { useEnterKey } from 'hooks/useEnterKey'
import { useRef } from 'react'

interface TextInputProps {
	value?: string
	onChange: (val: string) => void
	disabled?: boolean
	description: string
}
export const TextInput: React.FC<TextInputProps> = ({
	onChange, disabled, value, description
}) => {

	const inputRef = useRef<HTMLInputElement>(null)

	useEnterKey(() => {
		inputRef.current?.blur()
	})

	return (
		<div className="flex flex-row items-center justify-between">
			<div className="text-base text-secondary">{description}</div>
			<input
				ref={inputRef}
				value={value}
				onChange={e => onChange(e.target.value)}
				className="w-24 bg-bg-secondary text-right text-lg font-semibold text-primary"
				disabled={disabled}
			/>
		</div>
	)
}
