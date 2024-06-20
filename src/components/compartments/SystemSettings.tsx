import { FormContainer } from "components/atoms/Form/FormContainer";
import { Toggle } from "components/atoms/Toggle";
import { useSystemSettingsContext } from "contexts/SystemSettingsContext";
import { memo } from "react";

interface SystemSettingsProps {

}

export const SystemSettings = memo<SystemSettingsProps>(() => {

	const { autoStart, onToggleAutoStartup } = useSystemSettingsContext()

	return <FormContainer title='Settings'>
		<div className='flex flex-col gap-4 py-1'>
			<div className='flex flex-row items-center gap-4'>
				<span className='text-secondary'>Start on login</span>
				<Toggle checked={autoStart} onToggle={onToggleAutoStartup}
				/>
			</div>

			{/* <div className='flex flex-row items-center gap-4'>
<span className='text-secondary'>Apply selected process</span>
<Toggle onToggle={onToggleUseSavedProcess} checked={useSavedProcess} />
</div> */}

		</div>
	</FormContainer>

})
