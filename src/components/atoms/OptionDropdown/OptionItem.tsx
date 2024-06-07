import { memo } from "react"

interface OptionItemProps {
	title: string
	onClick: () => void
}

export const OptionItem = memo<OptionItemProps>(({ title, onClick }) => <div
	onClick={onClick}
	className='z-50 flex h-6 grow bg-bg-secondary p-2 hover:cursor-pointer hover:bg-bg-tertiary'>
	<span className='my-auto text-primary'>{title}</span>
</div>
)
