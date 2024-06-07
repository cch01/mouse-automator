import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from './components/atoms/Button'
import { ProcessDescriptor } from 'ps-list'
import { FormContainer } from './components/atoms/Form/FormContainer'
import { Tag } from 'components/atoms/Tag'
import { AutoComplete } from 'components/molecules/AutoComplete'

function App() {
  const [processList, setProcessList] = useState<ProcessDescriptor[]>([])
  const [selectedProcesses, setSelectedProcesses] = useState<ProcessDescriptor[]>([])
  const [filterKey, setFilterKey] = useState('')
  const [startedInterval, setStartedInterval] = useState<NodeJS.Timeout>()
  const [actionIntervalMs, setActionIntervalMs] = useState<number>(1000)

  const filteredList = useMemo(() =>
    processList.filter(({ name, pid }) =>
      [name, pid].some(key => key.toString().trim().toLowerCase().includes(filterKey.trim().toLowerCase())
      ))
    , [filterKey, processList])

  const onRemoveSelectedProcess = useCallback((selectedPid: number) => {
    setSelectedProcesses(vals => vals.filter(({ pid }) => pid !== selectedPid))
  }, [setSelectedProcesses])

  useEffect(() => {
    window.psList().then(setProcessList)
    setInterval(() => window.psList().then(setProcessList), 60000)
  }, [])


  const onStop = useCallback(() => startedInterval && clearInterval(startedInterval), [startedInterval])

  const onStart = useCallback(() => {
    onStop()

    setStartedInterval(setInterval(() => {
      window.mouseClick()
    }, actionIntervalMs))

  }, [setStartedInterval, onStop, actionIntervalMs])

  const onSelectProcess = useCallback((option: {
    label: string;
    value: string;
  }) => {
    const matchedProcess = filteredList.find(({ pid }) => pid.toString() === option.value)
    if (matchedProcess) setSelectedProcesses(vals => [...vals, matchedProcess])
  }, [setSelectedProcesses, filteredList])

  return (
    <div className='space-y-4 '>
      <FormContainer title='Application'>
        <div className='flex flex-col gap-4'>
          <div className='flex grow-0 flex-wrap gap-2'>
            {selectedProcesses.map(({ name, pid }, idx) => <Tag key={`${name}-${pid}-${idx}`} onClick={() => onRemoveSelectedProcess(pid)} title={`${name}-${pid}`} />)}
          </div>
          <AutoComplete options={filteredList.map(({ name, pid }) => ({ label: `${name} - ${pid}`, value: pid.toString() }))} onSelect={onSelectProcess} onChange={setFilterKey} value={filterKey} />
        </div>
      </FormContainer >

      <FormContainer title='Interval'>
        <input type='number' step={500} value={actionIntervalMs} onChange={(e) => setActionIntervalMs(Number(e.target.value || actionIntervalMs))} />
      </FormContainer>

      <FormContainer title='Mouse Action'>
        <input type='text' />
      </FormContainer>

      <div className='flex w-full flex-row justify-between'>
        <div className='space-x-4'>
          <Button onClick={onStart}>Start</Button>
          <Button onClick={onStop}>Stop</Button>
        </div>
        <Button onClick={() => null}>Exit</Button>
      </div>
    </div >
  )
}

export default App
