import { FormContainer } from "components/atoms/Form/FormContainer";
import { Tag } from "components/atoms/Tag";
import { AutoComplete } from "components/molecules/AutoComplete";
import { useProcessListContext } from "contexts/ProcessListContext";
import { useSystemSettingsContext } from "contexts/SystemSettingsContext";
import { memo, useCallback, useMemo } from "react";

interface ApplicationSelectorProps {

}

export const ApplicationSelector = memo<ApplicationSelectorProps>(() => {


	const {
		filterKey,
		matchedProcesses,
		onResetProcessStates,
		onSelectProcess,
		processSpecific,
		selectedProcesses,
		setFilterKey,
		setProcessSpecific,
		onRemoveSelectedProcess
	} = useProcessListContext()

	const { isAutomatorRunning } = useSystemSettingsContext()

	const onReset = useCallback(() => onResetProcessStates(isAutomatorRunning), [isAutomatorRunning, onResetProcessStates])

	const onSelect = useCallback((option: {
		label: string;
		value: string;
	}) => onSelectProcess(option.value, isAutomatorRunning), [isAutomatorRunning, onSelectProcess])

	const displayingProcessOptions = useMemo(() =>
		matchedProcesses.map(({ name, pid }) => ({ label: `${name} - ${pid}`, value: pid.toString() })).filter(({ value }) => !selectedProcesses.has(Number(value)))
		, [matchedProcesses, selectedProcesses])

	const onToggleProcessSpecific = useCallback(() => setProcessSpecific(val => !val), [setProcessSpecific])

	return <FormContainer
		onClearSection={onReset}
		clearButtonDisabled={isAutomatorRunning}
		title='Application'
		onToggleSwitch={onToggleProcessSpecific}
		showSwitch
		switchValue={processSpecific}
		toggleDisabled={isAutomatorRunning}
	>
		<div className='flex flex-col gap-4 py-2'>
			<AutoComplete options={displayingProcessOptions} onSelect={onSelect} onChange={setFilterKey} value={filterKey} />
			{!!selectedProcesses.size && <div className='flex max-h-[4.5rem] grow-0 flex-wrap gap-2 overflow-y-scroll'>
				{[...selectedProcesses.values()].map(({ name, pid }, idx) => <Tag key={`${name}-${pid}-${idx}`} onClick={() => onRemoveSelectedProcess(pid.toString(), isAutomatorRunning)} title={`${pid} - ${name}`} />)}
			</div>}
		</div>
	</FormContainer >

})
