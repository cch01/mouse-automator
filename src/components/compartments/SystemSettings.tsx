import { FormContainer } from "components/atoms/Form/FormContainer";
import { Toggle } from "components/atoms/Toggle";
import { useSystemSettingsContext } from "contexts/SystemSettingsContext";
import { memo } from "react";
import { getOs } from "utils/getOs";

const isWindows = getOs() === 'Windows'

export const SystemSettings = memo(() => {

	const {
		autoStart,
		closeToTray,
		onToggleAutoStartup,
		onToggleCloseToTray,
	} = useSystemSettingsContext()

	return <FormContainer title='Settings'>
		<div className='flex flex-col gap-4 py-1'>
			{isWindows && <div className='flex flex-row items-center gap-4'>
				<span className='text-secondary'>Start on login</span>
				<Toggle checked={autoStart} onToggle={onToggleAutoStartup}
				/>
			</div>}

			<div className='flex flex-row items-center gap-4'>
				<span className='text-secondary'>Close to tray</span>
				<Toggle checked={closeToTray} onToggle={onToggleCloseToTray}
				/>
			</div>
		</div>
	</FormContainer>

})


SystemSettings.displayName = 'SystemSettings'
