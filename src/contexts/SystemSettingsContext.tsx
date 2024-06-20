import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";

interface SystemSettingsContextProps {
	autoStart: boolean
	onToggleAutoStartup: (val: boolean) => void
	startedInterval: NodeJS.Timeout | undefined
	setStartedInterval: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>
	isAutomatorRunning: boolean
}

const SystemSettingsContext = createContext<SystemSettingsContextProps>({} as SystemSettingsContextProps);

export const SystemSettingsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

	const [autoStart, setAutoStart] = useState(!!window.appStorage.get('autoStart'))
	const [startedInterval, setStartedInterval] = useState<NodeJS.Timeout>()

	const onToggleAutoStartup = useCallback((val: boolean) => {
		window.appStorage.set('autoStart', val)
		window.toggleAutoStart(val)
		setAutoStart(val)
	}, [setAutoStart])

	const isAutomatorRunning = useMemo(() => !!startedInterval, [startedInterval])

	return <SystemSettingsContext.Provider value={{ isAutomatorRunning, autoStart, onToggleAutoStartup, startedInterval, setStartedInterval }}>
		{children}
	</SystemSettingsContext.Provider>

}

// eslint-disable-next-line react-refresh/only-export-components
export const useSystemSettingsContext = () => useContext(SystemSettingsContext)
