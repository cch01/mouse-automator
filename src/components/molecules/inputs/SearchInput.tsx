import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Button } from "components/atoms/Button";
import { forwardRef,  useCallback, useState } from "react";

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

	return <form onSubmit={onSearch}>
		<label htmlFor="search-input"
			className="sr-only mb-2 text-sm font-medium text-white">Search</label>
		<div className="relative">
			<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
				<FontAwesomeIcon className={clsx('size-4', (focused || value) ? 'text-primary' : 'text-gray-500')} icon={faMagnifyingGlass} />
			</div>
			<input
				ref={ref}
				onFocus={_onFocus}
				onBlur={_onBlur}
				onChange={(e) => onChange(e.target.value)}
				value={value}
				type="search"
				id="search-input"
				className="block w-full rounded-lg border border-border bg-bg-secondary p-4 ps-10 text-sm text-primary placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-blue-500"
				placeholder="Search" required />
			<div hidden={hideSearchButton} className="absolute bottom-2.5 end-2.5">
				<Button onClick={onSearch}>Search</Button>
			</div>
		</div>
	</form >
})
