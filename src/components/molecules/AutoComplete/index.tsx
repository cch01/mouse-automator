import { memo, useCallback, useRef, useState } from "react";
import { SearchInput, SearchInputProps } from "../inputs/SearchInput";
import { OptionItem } from "./OptionItem";
import { OptionContainer } from "./OptionContainer";
import { useClickOutside } from "hooks/useClickOutside";

interface AutoCompleteProps extends SearchInputProps {
	options: { label: string, value: string }[]
	onSelect: (option: { label: string, value: string }) => void
}

export const AutoComplete = memo<AutoCompleteProps>(({ onChange, value, onSearch, onSelect, options }) => {

	const [showResults, setShowResults] = useState(false)
	const searchInputRef = useRef<HTMLInputElement>(null)

	const _onSearch = useCallback(() => {
		onSearch?.()
		setShowResults(true)
	}, [onSearch, setShowResults])

	useClickOutside(() => setShowResults(false), searchInputRef)

	return <div>
		<SearchInput
			ref={searchInputRef}
			onSearch={_onSearch}
			hideSearchButton
			onFocus={() => setShowResults(true)}
			onChange={onChange}
			value={value}
		/>
		<OptionContainer show={showResults}>
			{options?.map((option, idx) => <OptionItem
				key={`option-${option.label}-${option.value}-${idx}`}
				onClick={() => onSelect(option)}
				title={option.label}
			/>)}
		</OptionContainer>
	</div>
})
