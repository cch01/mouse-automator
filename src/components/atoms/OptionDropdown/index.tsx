import { memo } from "react";
import { OptionContainer } from "./OptionContainer";
import { OptionItem } from "./OptionItem";

interface OptionDropdownProps {
	options: { label: string, value: string }[]
	onSelect: (option: { label: string, value: string }) => void,
	expanded: boolean
	highlightedOptionIdx?: number
}

export const OptionDropdown = memo<OptionDropdownProps>(({ options, onSelect, expanded, highlightedOptionIdx }) => {

	return <OptionContainer show={expanded}>
		{options?.map((option, idx) => <OptionItem
			highlighted={highlightedOptionIdx === idx}
			key={`option-${option.label}-${option.value}-${idx}`}
			onClick={() => onSelect(option)}
			title={option.label}
		/>)}
		{!options?.length && <OptionItem
			onClick={() => null}
			title='No results'
		/>}
	</OptionContainer>

})

OptionDropdown.displayName = 'OptionDropdown'
