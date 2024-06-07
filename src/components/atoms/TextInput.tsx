import { useEnterKey } from 'hooks/useEnterKey'
import { useRef } from 'react'
import { TextInputBase } from './TextInputBase'

interface TextInputProps {
	value?: string | number
	onChange: (val: string | number) => void
	disabled?: boolean
	description: string
	suffix?: string
	type?: React.HTMLInputTypeAttribute
	step?: number
}
export const TextInput: React.FC<TextInputProps> = ({
	onChange, disabled, value, description, suffix, step, type = 'text'
}) => {

	const inputRef = useRef<HTMLInputElement>(null)

	useEnterKey(() => {
		inputRef.current?.blur()
	})

	return (
		<div className="flex flex-col items-start justify-center gap-1">
			<div className="text-base text-secondary">{description}</div>
			<div className='relative flex w-fit'>
				<TextInputBase
					ref={inputRef}
					onChange={onChange}
					value={value?.toString() || ''}
					type={type}
					step={step}
					disabled={disabled}
				/>
				<span className='absolute inset-y-0 right-2 inline-flex items-center text-secondary'>{suffix}</span>
			</div>
		</div>
	)
}
