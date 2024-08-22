import { Button } from "components/atoms/Button";
import { useMouseActionContext } from "contexts/MouseActionContext";
import { useProcessListContext } from "contexts/ProcessListContext";
import { useSystemSettingsContext } from "contexts/SystemSettingsContext";
import { memo, useCallback, useEffect } from "react";
import { toast } from "react-toastify";


interface BottomActionsProps {

}

export const MainActions = memo<BottomActionsProps>(() => {

	const { isAutomatorRunning, setStartedInterval, startedInterval } = useSystemSettingsContext()

	const { selectedProcesses, processSpecific, processList } = useProcessListContext()

	const { selectedMouseAction, selectedMouseButton, actionIntervalSecond } = useMouseActionContext()

	const onStop = useCallback(() => {
		if (startedInterval) {
			clearInterval(startedInterval)
			toast.info('Service Stopped');
		}
		setStartedInterval(undefined)
	}, [startedInterval, setStartedInterval])

	const onStart = useCallback(() => {

		if (!selectedProcesses.size && processSpecific) return toast.error('Please select a process to start.')

		setStartedInterval(setInterval(() => {
			const actionType = selectedMouseAction.value as "singleClick" | "doubleClick"
			const buttonType = selectedMouseButton.value as 'left' | "right" | "middle"
			window.mouseClick(actionType, buttonType)

		}, actionIntervalSecond * 1000))

		toast.success('Service Started')

	}, [selectedProcesses.size, processSpecific, setStartedInterval, actionIntervalSecond, selectedMouseAction.value, selectedMouseButton.value])

	useEffect(() => {
		if (!processSpecific) return
		const anySelectedProcessExist = !![...selectedProcesses.values()].find(({ pid }) => processList.find(({ pid: originalPid }) => originalPid === pid))
		if (!anySelectedProcessExist && startedInterval) {
			toast.info('Service stopped due to target process not found')
			onStop()
		}
	}, [processSpecific, processList, onStop, selectedProcesses, startedInterval])


	return <div className='flex justify-between'>
		<div className='space-x-4'>
			<Button isDisabled={isAutomatorRunning} onClick={onStart}>Start</Button>
			<Button isDisabled={!isAutomatorRunning} onClick={onStop}>Stop</Button>
		</div>
		<Button onClick={window.exit}>Exit</Button>
	</div>

})
