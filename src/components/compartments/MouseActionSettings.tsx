import { FormContainer } from "components/atoms/Form/FormContainer";
import { TextInput } from "components/atoms/TextInput";
import { Options } from "components/molecules/inputs/Options";
import { useMouseActionContext } from "contexts/MouseActionContext";
import { MOUSE_ACTION_OPTIONS, MOUSE_BUTTON_TYPE_OPTIONS } from "contexts/MouseActionContext/constants";
import { useSystemSettingsContext } from "contexts/SystemSettingsContext";
import { memo } from "react";

interface MouseActionSettingsProps {
}

export const MouseActionSettings = memo<MouseActionSettingsProps>(() => {

	const {
		actionIntervalSecond,
		onSelectMouseAction,
		onSelectMouseButton,
		selectedMouseAction,
		selectedMouseButton,
		setActionIntervalSecond,
	} = useMouseActionContext()


	const { isAutomatorRunning } = useSystemSettingsContext()

	return <FormContainer title='Mouse Action'>
		<div className='flex w-48 flex-col gap-4 py-1'>
			<TextInput
				description='Interval'
				value={actionIntervalSecond}
				onChange={(val) => setActionIntervalSecond(Number(val))}
				type='number'
				step={5}
				suffix='s'
				disabled={isAutomatorRunning}
				min={0}
			/>

			<div className='flex w-48 flex-col gap-2'>
				<span className='text-secondary'>Mouse Action</span>
				<Options disabled={isAutomatorRunning} options={MOUSE_ACTION_OPTIONS} onSelect={onSelectMouseAction} selectedOption={selectedMouseAction} />
				<Options disabled={isAutomatorRunning} options={MOUSE_BUTTON_TYPE_OPTIONS} onSelect={onSelectMouseButton} selectedOption={selectedMouseButton} />
			</div>
		</div>
	</FormContainer>

})
