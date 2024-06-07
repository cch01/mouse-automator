import clsx from "clsx";
import { memo } from "react";

interface OptionContainerProps {
	children: React.ReactNode
	show?: boolean
}

export const OptionContainer = memo<OptionContainerProps>(({ children, show }) => {

	const outerClasses = clsx(show ? 'border-border' : '', 'overflow-hidden rounded-md border border-solid  shadow-md')

	const innerClasses = clsx(show ? 'max-h-48' : 'max-h-0',
		"overflow-y-auto  transition-all duration-300 ease-in-out"
	)

	return <div className={outerClasses}>
		<div className={innerClasses}>
			{children}
		</div>
	</div>
}
)
