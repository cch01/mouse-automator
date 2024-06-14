import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Button } from "components/atoms/Button";
import { TextInputBase } from "components/atoms/TextInputBase";
import { forwardRef, useCallback, useState } from "react";

export interface SearchInputProps {
	value: string
	onChange: (val: string) => void
	onSearch?: () => void
	onFocus?: React.FocusEventHandler<HTMLInputElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	hideSearchButton?: boolean
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ onChange, onSearch, value, onBlur, onFocus, hideSearchButton }, ref) => {

	const [focused, setFocused] = useState(false)

	const _onBlur: React.FocusEventHandler<HTMLInputElement> = useCallback((e) => {
		onBlur?.(e)
		setFocused(false)
	}, [onBlur, setFocused])

	const _onFocus: React.FocusEventHandler<HTMLInputElement> = useCallback((e) => {
		onFocus?.(e)
		setFocused(true)
	}, [setFocused, onFocus])


	return <div >
		<label htmlFor="search-input"
			className="sr-only mb-2 text-sm font-medium text-white">Search</label>
		<div className="relative flex-row">
			<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
				<FontAwesomeIcon className={clsx('size-4', (focused || value) ? 'text-primary' : 'text-gray-500')} icon={faMagnifyingGlass} />
			</div>
			<div className='flex'>
				<TextInputBase
					ref={ref}
					onFocus={_onFocus}
					onBlur={_onBlur}
					onChange={onChange}
					value={value}
					placeholder="Search"
					required={false}
					extendedClasses="ps-10"
				/>
			</div>
			<div hidden={hideSearchButton} className="absolute bottom-2.5 end-2.5">
				<Button onClick={onSearch}>Search</Button>
			</div>
		</div>
	</div >
})
