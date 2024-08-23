import clsx from "clsx"
import { memo, useEffect, useRef } from "react"

interface OptionItemProps {
	title: string
	onClick: () => void
	highlighted?: boolean
}

export const OptionItem = memo<OptionItemProps>(({ title, onClick, highlighted }) => {

	const itemRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!highlighted) return

		const containerRect = itemRef.current?.parentElement?.getBoundingClientRect();
		const itemRect = itemRef.current?.getBoundingClientRect();

		if (!containerRect || !itemRect) return

		const isOutOfView = itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom;

		if (isOutOfView) {
			itemRef.current!.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}

	}, [highlighted])

	return <div
		ref={itemRef}
		onClick={onClick}
		className={clsx(
			highlighted && 'bg-bg-tertiaryHover',
			'z-50 flex h-6 grow bg-bg-secondary p-2 hover:cursor-pointer hover:bg-bg-tertiaryHover'
		)}>
		<span className='my-auto text-primary'>{title}</span>
	</div>
})

OptionItem.displayName = 'OptionItem'
