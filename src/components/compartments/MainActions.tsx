import { Button } from "components/atoms/Button";
import { useMouseActionContext } from "contexts/MouseActionContext";
import { useProcessListContext } from "contexts/ProcessListContext";
import { useSystemSettingsContext } from "contexts/SystemSettingsContext";
import { memo, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { showSystemNotification } from "utils/showSystemNotification";



export const MainActions = memo(() => {

	const { isAutomatorRunning, setStartedInterval, startedInterval } = useSystemSettingsContext()

	const { selectedProcesses, processSpecific, processList, setProcessSpecific } = useProcessListContext()

	const { mouseOptions } = useMouseActionContext()

	const onStop = useCallback(() => {
		if (startedInterval) {
			clearInterval(startedInterval)
			toast.info('Service Stopped');
		}
		setStartedInterval(undefined)
		window.runStopServiceEffects()
	}, [startedInterval, setStartedInterval])

	const onStart = useCallback(() => {

		if (!selectedProcesses.size && processSpecific) {
			const errorMsg = 'Please select a process to start\nOr Click HERE to turn off application constrain.'
			toast.error(errorMsg, { onClick: () => setProcessSpecific(false) })
			throw errorMsg
		}

		setStartedInterval(setInterval(() => {
			window.mouseClick(mouseOptions.actionType, mouseOptions.clickButton)

		}, mouseOptions.intervalSecond * 1000))
		window.runStartServiceEffects()

		toast.success('Service Started')

	}, [selectedProcesses.size, processSpecific, setStartedInterval, mouseOptions.intervalSecond, mouseOptions.actionType, mouseOptions.clickButton, setProcessSpecific])

	useEffect(() => {
		if (!processSpecific) return
		const anySelectedProcessExist = !![...selectedProcesses.values()].find(({ pid }) => processList.find(({ pid: originalPid }) => originalPid === pid))
		if (!anySelectedProcessExist && startedInterval) {
			toast.info('Service stopped due to target process not found')
			onStop()
		}
	}, [processSpecific, processList, onStop, selectedProcesses, startedInterval])

	useEffect(() => {
		window.ipcRenderer.removeAllListeners('start-service')
		window.ipcRenderer.removeAllListeners('stop-service')

		window.ipcRenderer.on('start-service', () => {
			try {
				onStart()
				showSystemNotification({ title: 'Service Started', body: 'Go and grab a coffee ☕' })
			} catch (errMsg) {
				showSystemNotification({ title: 'Failed', body: errMsg + '😢', onClick: () => setProcessSpecific(false) })
			}

		})
		window.ipcRenderer.on('stop-service', () => {
			onStop()
			showSystemNotification({ title: 'Service Stopped', body: 'Welcome back 😉' })
		})

	}, [onStop, onStart, setProcessSpecific])


	return <div className='flex justify-between'>
		<div className='space-x-4'>
			<Button isDisabled={isAutomatorRunning} onClick={onStart}>Start</Button>
			<Button isDisabled={!isAutomatorRunning} onClick={onStop}>Stop</Button>
		</div>
		<Button onClick={window.exit}>Exit</Button>
	</div>

})


MainActions.displayName = 'MainActions'
