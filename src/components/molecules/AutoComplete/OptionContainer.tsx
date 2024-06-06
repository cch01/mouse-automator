import clsx from "clsx";
import { memo } from "react";

interface OptionContainerProps {
	children: React.ReactNode
	show?: boolean
}

export const OptionContainer = memo<OptionContainerProps>(({ children, show }) => {

	const classes = clsx(show ? 'max-h-48' : 'max-h-0',
		"w-full overflow-y-auto rounded-md border border-solid border-red-600 shadow-md transition-all duration-300 ease-in-out"
	)

	return <div className={classes}>
		{children}
	</div>
}
)
