import { useCallback, useState, createContext, useContext, PropsWithChildren } from "react";
import {  MOUSE_ACTION_OPTIONS, MOUSE_BUTTON_TYPE_OPTIONS } from "./constants";

type MouseOptions = {
	intervalSecond: number
	actionType: 'singleClick' | 'doubleClick'
	clickButton: 'left' | 'right' | 'middle'
	loadOnStartup: boolean
}
interface MouseActionContextProps {
	onSelectMouseAction: (_label: string) => void;
	onSelectMouseButton: (_label: string) => void;
	onTogglePreserveMouseOptions: (val: boolean) => void
	mouseOptions: MouseOptions
	setActionIntervalSecond: (intervalSecond: number) => void
}

export const MouseActionContext = createContext<MouseActionContextProps>(
	{} as MouseActionContextProps
);

export const MouseActionContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

	const record = window.appStorage.get('mouseOptions') as MouseOptions

	const [mouseOptions, setMouseOptions] = useState<MouseOptions>({ loadOnStartup: false, actionType: 'singleClick', clickButton: 'middle', intervalSecond: 30, ...(record?.loadOnStartup && record || {}) })

	const onSelectMouseAction = useCallback((_label: string) => {
		const selectedAction = MOUSE_ACTION_OPTIONS.find(({ label }) => label === _label)
		if (selectedAction) setMouseOptions(val => {
			const newVals = { ...val, actionType: selectedAction.value as "singleClick" | "doubleClick" }
			window.appStorage.set('mouseOptions', newVals)
			return newVals
		})
	}, [setMouseOptions])

	const onSelectMouseButton = useCallback((_label: string) => {
		const selectedMouseButton = MOUSE_BUTTON_TYPE_OPTIONS.find(({ label }) => label === _label)
		if (selectedMouseButton) setMouseOptions(val => {
			const newVals = { ...val, clickButton: selectedMouseButton.value as "left" | "right" | "middle" }
			window.appStorage.set('mouseOptions', newVals)
			return newVals
		})
	}, [setMouseOptions])

	const setActionIntervalSecond = useCallback((intervalSecond: number) => {
		setMouseOptions(val => {
			const newVals = { ...val, intervalSecond }
			window.appStorage.set('mouseOptions', newVals)
			return (newVals)
		})
	}, [setMouseOptions])

	const onTogglePreserveMouseOptions = useCallback((enable: boolean) => {
		setMouseOptions(val => {
			const newVals = { ...val, loadOnStartup: enable }
			window.appStorage.set('mouseOptions', newVals)
			return newVals
		})
	},[setMouseOptions])


	return <MouseActionContext.Provider value={{
		onSelectMouseAction, onSelectMouseButton,
		mouseOptions, setActionIntervalSecond, onTogglePreserveMouseOptions
	}}>
		{children}
	</MouseActionContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMouseActionContext = () => useContext(MouseActionContext);
