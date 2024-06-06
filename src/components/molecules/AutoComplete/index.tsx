import { memo, useCallback, useState } from "react";
import { SearchInput, SearchInputProps } from "../inputs/SearchInput";
import { OptionItem } from "./OptionItem";
import { OptionContainer } from "./OptionContainer";

interface AutoCompleteProps extends SearchInputProps {
	options: { label: string, value: string }[]
	onSelect: (option: { label: string, value: string }) => void
}

export const AutoComplete = memo<AutoCompleteProps>(({ onChange, value, onSearch, onSelect, options }) => {

	const [showResults, setShowResults] = useState(false)

	const _onSearch = useCallback(() => {
		onSearch?.()
		setShowResults(true)
	}, [onSearch, setShowResults])

	return <div>
		<SearchInput onSearch={_onSearch}
			hideSearchButton onBlur={() => setShowResults(false)} onFocus={() => setShowResults(true)} onChange={onChange} value={value}
		/>
		<OptionContainer show={showResults}>
			{options?.map((option, idx) => <OptionItem
				key={`option-${option.label}-${option.value}-${idx}`}
				onClick={() => { console.log('selected', option); onSelect(option) }}
				title={option.label}
			/>)}
		</OptionContainer>
	</div>
})
