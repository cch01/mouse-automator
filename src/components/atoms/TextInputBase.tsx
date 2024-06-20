import clsx from "clsx"
import { forwardRef, memo } from "react"

interface TextInputBaseProps {
	onFocus?: React.FocusEventHandler<HTMLInputElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	onChange: (val: string) => void
	value: string
	required?: boolean
	placeholder?: string
	extendedClasses?: string
	step?: number
	type?: React.HTMLInputTypeAttribute
	disabled?: boolean
	min?: number
}

export const TextInputBase = memo(forwardRef<HTMLInputElement, TextInputBaseProps>(({min, disabled, step, type = 'text', extendedClasses, placeholder, onBlur, onFocus, onChange, value, required }, ref) => {

	const classes = clsx("block w-full rounded-lg border border-border bg-bg-secondary p-2 text-sm text-primary placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-blue-500",
		extendedClasses,
	)

	return <input
		ref={ref}
		onFocus={onFocus}
		onBlur={onBlur}
		onChange={(e) => onChange(e.target.value)}
		value={value}
		className={classes}
		placeholder={placeholder} required={required}
		step={step}
		type={type}
		disabled={disabled}
		min={min}
	/>
}))
