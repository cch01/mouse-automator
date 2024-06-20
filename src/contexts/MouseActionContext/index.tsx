import { useCallback, useState, createContext, useContext, PropsWithChildren } from "react";
import { INITIAL_INTERVAL_SECONDS, MOUSE_ACTION_OPTIONS, MOUSE_BUTTON_TYPE_OPTIONS } from "./constants";

interface MouseActionContextProps {
	selectedMouseAction: {
		label: string;
		value: string;
	};
	selectedMouseButton: {
		label: string;
		value: string;
	};

	onSelectMouseAction: (_label: string) => void;
	onSelectMouseButton: (_label: string) => void;

	actionIntervalSecond: number;
	setActionIntervalSecond: React.Dispatch<React.SetStateAction<number>>;
}

export const MouseActionContext = createContext<MouseActionContextProps>(
	{} as MouseActionContextProps
);


export const MouseActionContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

	const [selectedMouseAction, setSelectedMouseAction] = useState(MOUSE_ACTION_OPTIONS[0])
	const [selectedMouseButton, setSelectedMouseButton] = useState(MOUSE_BUTTON_TYPE_OPTIONS[0])
	const [actionIntervalSecond, setActionIntervalSecond] = useState(INITIAL_INTERVAL_SECONDS)

	const onSelectMouseAction = useCallback((_label: string) => {
		const selectedAction = MOUSE_ACTION_OPTIONS.find(({ label }) => label === _label)
		if (selectedAction) setSelectedMouseAction(selectedAction)
	}, [setSelectedMouseAction])

	const onSelectMouseButton = useCallback((_label: string) => {
		const selectedMouseButton = MOUSE_BUTTON_TYPE_OPTIONS.find(({ label }) => label === _label)
		if (selectedMouseButton) setSelectedMouseButton(selectedMouseButton)
	}, [setSelectedMouseButton])


	return <MouseActionContext.Provider value={{
		selectedMouseAction,
		selectedMouseButton,
		onSelectMouseAction, onSelectMouseButton,
		actionIntervalSecond, setActionIntervalSecond
	}}>
		{children}
	</MouseActionContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMouseActionContext = () => useContext(MouseActionContext);
