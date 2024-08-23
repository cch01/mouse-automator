import { FormContainer } from "components/atoms/Form/FormContainer";
import { TextInput } from "components/atoms/TextInput";
import { Toggle } from "components/atoms/Toggle";
import { Options } from "components/molecules/inputs/Options";
import { useMouseActionContext } from "contexts/MouseActionContext";
import { MOUSE_ACTION_OPTIONS, MOUSE_BUTTON_TYPE_OPTIONS } from "contexts/MouseActionContext/constants";
import { useSystemSettingsContext } from "contexts/SystemSettingsContext";
import { memo, useMemo } from "react";

interface MouseActionSettingsProps {
}

export const MouseActionSettings = memo<MouseActionSettingsProps>(() => {

	const {
		mouseOptions, onSelectMouseAction, onSelectMouseButton, onTogglePreserveMouseOptions, setActionIntervalSecond

	} = useMouseActionContext()


	const { isAutomatorRunning } = useSystemSettingsContext()

	const selectedMouseAction = useMemo(() =>
		MOUSE_ACTION_OPTIONS.find(({ value }) => value === mouseOptions.actionType) || MOUSE_ACTION_OPTIONS[0]
		, [mouseOptions.actionType])

	const selectedMouseButton = useMemo(() =>
		MOUSE_BUTTON_TYPE_OPTIONS.find(({ value }) => value === mouseOptions.clickButton) || MOUSE_BUTTON_TYPE_OPTIONS[0]
		, [mouseOptions.clickButton])

	return <FormContainer title='Mouse Action'>
		<div className='flex w-48 flex-col gap-4 py-1'>
			<TextInput
				description='Interval Second'
				value={mouseOptions.intervalSecond}
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

			<div className='flex flex-row items-center gap-4'>
				<span className='text-secondary'>Preserve Settings</span>
				<Toggle onToggle={onTogglePreserveMouseOptions} checked={mouseOptions.loadOnStartup} />
			</div>
		</div>
	</FormContainer>

})

MouseActionSettings.displayName = 'MouseActionSettings'
