import clsx from "clsx";
import { memo } from "react";

interface OptionsProps {
	selectedOption: { label: string, value: string }
	onSelect: (label: string) => void
	options: { label: string, value: string }[]
	extendedClasses?: string
	disabled?: boolean
}

export const Options = memo<OptionsProps>(({ disabled, onSelect, options, selectedOption, extendedClasses }) => {

	const classes = clsx("block w-full rounded-lg border border-border bg-bg-secondary p-2 text-sm text-primary placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-blue-500",
		extendedClasses,
	)


	return <div className='w-full'>
		<select disabled={disabled} value={selectedOption.label} onChange={(event) => onSelect(event.target.value)} className={classes} >
			{options?.map((option, idx) => <option value={option.label} key={`mouse-action-${idx}`} >{option.label}</option>)}
		</select>
	</div>

})

Options.displayName = 'OptionsDropdown'
