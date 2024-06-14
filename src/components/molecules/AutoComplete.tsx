import { memo, useCallback, useRef, useState } from "react";
import { SearchInput, SearchInputProps } from "./inputs/SearchInput";
import { OptionDropdown } from "components/atoms/OptionDropdown";
import { Keys, useKeysCallbacks } from "hooks/useKeysCallbacks";

interface AutoCompleteProps extends SearchInputProps {
	options: { label: string, value: string }[]
	onSelect: (option: { label: string, value: string }) => void
}

export const AutoComplete = memo<AutoCompleteProps>(({ onChange, value, onSelect, options }) => {

	const searchInputRef = useRef<HTMLInputElement>(null)
	const [highlightedOptionIdx, setHighlightedOptionIdx] = useState(-1)
	const [isFocused, setIsFocused] = useState(false)

	useKeysCallbacks([
		{ key: Keys.ARROW_UP, callback: () => isFocused && setHighlightedOptionIdx(val => Math.max(val - 1, 0)) },
		{ key: Keys.ARROW_DOWN, callback: () => isFocused && setHighlightedOptionIdx(val => Math.min(val + 1, options.length - 1)) },
		{ key: Keys.ESCAPE, callback: () => setHighlightedOptionIdx(-1) },
		{
			key: Keys.ENTER, callback: () => {
				if (highlightedOptionIdx < 0) return
				onSelect(options[highlightedOptionIdx])
				setHighlightedOptionIdx(-1)
			}
		},
		{
			key: Keys.ARROW_DOWN, callback: () => {
				if (isFocused && highlightedOptionIdx === -1) {
					setHighlightedOptionIdx(0)
				}
			}
		}
	])

	const onFocus = useCallback(() => {
		setIsFocused(true)
		setHighlightedOptionIdx(0)
	}, [setIsFocused])

	const onBlur = useCallback(() => {
		setHighlightedOptionIdx(-1)
		setIsFocused(false)
	}, [setIsFocused])

	const _onChange = useCallback((val: string) => {
		onChange(val)
		onFocus()
	}, [onChange])

	return <div className='w-full'>
		<SearchInput
			ref={searchInputRef}
			hideSearchButton
			onFocus={onFocus}
			onBlur={onBlur}
			onChange={_onChange}
			value={value}
		/>
		<OptionDropdown
			onSelect={onSelect}
			expanded={highlightedOptionIdx > -1}
			options={options}
			highlightedOptionIdx={highlightedOptionIdx}
		/>
	</div>
})
