import { PropsWithChildren } from "react"
import { MouseActionContextProvider } from "./MouseActionContext"
import { ProcessLIstContextProvider } from "./ProcessListContext"
import { SystemSettingsContextProvider } from "./SystemSettingsContext"

export const Contexts: React.FC<PropsWithChildren> = ({ children }) => <SystemSettingsContextProvider>
	<ProcessLIstContextProvider>
		<MouseActionContextProvider>
			{children}
		</MouseActionContextProvider>
	</ProcessLIstContextProvider>
</SystemSettingsContextProvider>
