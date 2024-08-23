import { useQuery } from "@tanstack/react-query";
import { ProcessDescriptor } from "@trufflesuite/ps-list";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface ProcessLIstContextProps {
	setFilterKey: React.Dispatch<React.SetStateAction<string>>
	processList: ProcessDescriptor[]
	selectedProcesses: Map<number, ProcessDescriptor>
	filterKey: string
	processSpecific: boolean
	setProcessSpecific: React.Dispatch<React.SetStateAction<boolean>>
	isProcessListInitiated: boolean
	matchedProcesses: ProcessDescriptor[]
	onSelectProcess: (pid: string, isAutomatorRunning: boolean) => void
	onRemoveSelectedProcess: (selectedPid: string, isAutomatorRunning: boolean) => void
	onResetProcessStates: (isAutomatorRunning: boolean) => void
}

const ProcessListContext = createContext<ProcessLIstContextProps>({} as ProcessLIstContextProps)

export const ProcessLIstContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

	const [selectedProcesses, setSelectedProcesses] = useState<Map<number, ProcessDescriptor>>(new Map())

	const { data: processList, refetch: refetchProcessList, isSuccess: isProcessListInitiated } = useQuery({
		queryKey: ['process-list'],
		queryFn: () => window.psList(), initialData: [],
	})

	const [filterKey, setFilterKey] = useState('')

	const [processSpecific, setProcessSpecific] = useState(false)

	const matchedProcesses = useMemo(() =>
		processList.filter(({ name, pid }) =>
			[name, pid].some(key => key.toString().trim().toLowerCase().includes(filterKey.trim().toLowerCase())
			))
		, [filterKey, processList])

	const onSelectProcess = useCallback((pid: string, isAutomatorRunning: boolean) => {
		const matchedProcess = matchedProcesses.find(({ pid: _pid }) => _pid.toString() === pid)
		if (matchedProcess) setSelectedProcesses(vals => {
			vals.set(matchedProcess.pid, matchedProcess)
			if (!isAutomatorRunning) setProcessSpecific(true)
			return new Map(vals)
		})
	}, [setSelectedProcesses, matchedProcesses, setProcessSpecific])

	const onResetProcessStates = useCallback((isAutomatorRunning?: boolean) => {
		if (!isAutomatorRunning) {
			setProcessSpecific(false)
			setSelectedProcesses(vals => {
				vals.clear()
				return new Map(vals)
			})
		}

		refetchProcessList()

	}, [refetchProcessList])

	const onRemoveSelectedProcess = useCallback((selectedPid: string, isAutomatorRunning: boolean) => {
		if (!processSpecific || !isAutomatorRunning) {
			setSelectedProcesses(vals => {
				vals.delete(Number(selectedPid))
				return new Map(vals)
			})
		}
	}, [processSpecific])


	const onRefreshProcessLIst = useCallback(async () => {

		const { data: newList } = await refetchProcessList()

		setSelectedProcesses(vals => {
			[...vals.keys()].forEach((key) => !newList?.find(({ pid }) => key === pid) && vals.delete(key))
			return new Map(vals)
		})

	}, [refetchProcessList])


	useEffect(() => {
		setInterval(() => onRefreshProcessLIst(), 10000)
	}, [onRefreshProcessLIst])


	return <ProcessListContext.Provider value={{
		filterKey,
		isProcessListInitiated,
		matchedProcesses,
		onResetProcessStates,
		onSelectProcess,
		onRemoveSelectedProcess,
		processSpecific,
		selectedProcesses,
		setFilterKey,
		setProcessSpecific,
		processList,
	}}>
		{children}
	</ProcessListContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProcessListContext = () => useContext(ProcessListContext)
