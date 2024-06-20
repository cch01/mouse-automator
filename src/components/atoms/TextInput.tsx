import { TextInputBase } from './TextInputBase'

interface TextInputProps {
	value?: string | number
	onChange: (val: string | number) => void
	disabled?: boolean
	description: string
	suffix?: string
	type?: React.HTMLInputTypeAttribute
	step?: number
	min?: number
}
export const TextInput: React.FC<TextInputProps> = ({
	min, onChange, disabled, value, description, suffix, step, type = 'text'
}) => {

	return (
		<div className="flex flex-col items-start justify-center gap-1">
			<div className="text-base text-secondary">{description}</div>
			<div className='relative flex w-fit'>
				<TextInputBase
					onChange={onChange}
					value={value?.toString() || ''}
					type={type}
					step={step}
					disabled={disabled}
					min={min}
				/>
				<span className='absolute inset-y-0 right-2 inline-flex items-center text-secondary'>{suffix}</span>
			</div>
		</div>
	)
}
