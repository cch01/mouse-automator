import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memo } from "react"


interface TagProps {
	title: string
	onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Tag: React.FC<TagProps> = memo<TagProps>(({ onClick, title }) => <>
	<span onClick={onClick} className="inline-flex select-text items-center gap-2 rounded-md bg-bg-secondary px-2 py-1 font-medium text-secondary ring-1 ring-inset ring-gray-500/10 hover:cursor-pointer hover:text-primary">
		{title}<FontAwesomeIcon className="hover:text-primary" icon={faXmark} />
	</span>
</>
)
