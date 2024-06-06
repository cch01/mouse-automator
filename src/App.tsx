import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from './components/atoms/Button'
import { ProcessDescriptor } from 'ps-list'
import { FormContainer } from './components/atoms/Form/FormContainer'

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
    if (!processList.length) window.psList().then(setProcessList)
  }, [processList.length])


  const onStop = useCallback(() => startedInterval && clearInterval(startedInterval), [startedInterval])

  const onStart = useCallback(() => {
    onStop()

    setStartedInterval(setInterval(() => {
      window.mouseClick()
    }, actionIntervalMs))

  }, [setStartedInterval, onStop, actionIntervalMs])


  
  return (
    <div className='space-y-4 '>
      <FormContainer title='Application'>
        <div className='flex flex-col space-y-4'>
          {selectedProcesses.map(({ name, pid }) =>
            <div className='flex flex-row'>
              <div className='text-primary' >{`${name}-${pid}`}</div>
              <input key={`${name}-${pid}-selected`} type='checkbox' checked onChange={() => onRemoveSelectedProcess(pid)} />
            </div>
          )}
          <input value={filterKey} onChange={(e) => setFilterKey(e.target.value)} className='w-fit' />
          <select className='w-fit' onChange={(e) => setSelectedProcesses(vals => [...vals, filteredList.find(({ pid }) => pid.toString() === e.target.value)!])}>
            {filteredList.map(({ name, pid }) => <option value={pid}>{`${name} - ${pid}`}</option>)}
          </select>
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
