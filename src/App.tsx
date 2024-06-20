import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from './components/atoms/Button'
import { ProcessDescriptor } from 'ps-list'
import { FormContainer } from './components/atoms/Form/FormContainer'
import { Tag } from 'components/atoms/Tag'
import { TextInput } from 'components/atoms/TextInput'
import { AutoComplete } from 'components/molecules/AutoComplete'
import { Options } from 'components/molecules/inputs/Options'
import banner from '/banner.jpg';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Toggle } from 'components/atoms/Toggle'

const MOUSE_ACTION_OPTIONS = [{ label: 'Single Click', value: 'singleClick' }, { label: 'Double Click', value: 'doubleClick' }]
const MOUSE_BUTTON_TYPE_OPTIONS = [{ label: 'Middle Click', value: 'middle' }, { label: 'Left Click', value: 'left' }, { label: 'Right Click', value: 'right' }]

function App() {
  const [processList, setProcessList] = useState<ProcessDescriptor[]>([])
  const [selectedProcesses, setSelectedProcesses] = useState<Map<number, ProcessDescriptor>>(new Map())
  const [filterKey, setFilterKey] = useState('')
  const [startedInterval, setStartedInterval] = useState<NodeJS.Timeout>()

  const [actionIntervalSecond, setActionIntervalSecond] = useState(30)

  const [processSpecific, setProcessSpecific] = useState(false)

  const [selectedMouseAction, setSelectedMouseAction] = useState(MOUSE_ACTION_OPTIONS[0])
  const [selectedMouseButton, setSelectedMouseButton] = useState(MOUSE_BUTTON_TYPE_OPTIONS[0])

  const [autoStart, setAutoStart] = useState(!!window.appStorage.get('autoStart'))

  const filteredList = useMemo(() =>
    processList.filter(({ name, pid }) =>
      [name, pid].some(key => key.toString().trim().toLowerCase().includes(filterKey.trim().toLowerCase())
      ))
    , [filterKey, processList])

  const onRemoveSelectedProcess = useCallback((selectedPid: number) => {
    setSelectedProcesses(vals => {
      vals.delete(selectedPid)
      return new Map(vals)
    })
  }, [setSelectedProcesses])

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

  }, [selectedProcesses.size, processSpecific, actionIntervalSecond, selectedMouseAction.value, selectedMouseButton.value])

  const onSelectProcess = useCallback((option: {
    label: string;
    value: string;
  }) => {
    const matchedProcess = filteredList.find(({ pid }) => pid.toString() === option.value)
    if (matchedProcess) setSelectedProcesses(vals => {
      vals.set(matchedProcess.pid, matchedProcess)
      if (!startedInterval) setProcessSpecific(true)
      return new Map(vals)
    })
  }, [setSelectedProcesses, filteredList, setProcessSpecific, startedInterval])


  const displayingProcessOptions = useMemo(() =>
    filteredList.map(({ name, pid }) => ({ label: `${name} - ${pid}`, value: pid.toString() })).filter(({ value }) => !selectedProcesses.has(Number(value)))
    , [filteredList, selectedProcesses])

  const onResetProcessStates = useCallback(() => {
    if (!startedInterval) {
      setProcessSpecific(false)
      setSelectedProcesses(vals => {
        vals.clear()
        return new Map(vals)
      })
    }

    window.psList().then(setProcessList)

  }, [setSelectedProcesses, startedInterval, setProcessList, setProcessSpecific])

  const onSelectMouseAction = useCallback((_label: string) => {
    const selectedAction = MOUSE_ACTION_OPTIONS.find(({ label }) => label === _label)
    if (selectedAction) setSelectedMouseAction(selectedAction)
  }, [setSelectedMouseAction])

  const onSelectMouseButton = useCallback((_label: string) => {
    const selectedMouseButton = MOUSE_BUTTON_TYPE_OPTIONS.find(({ label }) => label === _label)
    if (selectedMouseButton) setSelectedMouseButton(selectedMouseButton)
  }, [setSelectedMouseButton])

  const onRemoveProcess = useCallback((pid: number) => {
    (!processSpecific || !startedInterval) && onRemoveSelectedProcess(pid)
  }, [processSpecific, startedInterval, onRemoveSelectedProcess])

  const onToggleAutoStartup = useCallback((val: boolean) => {
    window.appStorage.set('autoStart', val)
    window.toggleAutoStart(val)
    setAutoStart(val)
  }, [setAutoStart])

  useEffect(() => {
    window.psList().then(setProcessList)
    setInterval(() => window.psList().then(newList => {
      setSelectedProcesses(vals => {
        [...vals.keys()].forEach((key) => !newList.find(({ pid }) => key === pid) && vals.delete(key))
        return new Map(vals)
      })
      setProcessList(newList)
    }), 10000)
  }, [])

  useEffect(() => {
    if (!processSpecific) return
    const anySelectedProcessExist = !![...selectedProcesses.values()].find(({ pid }) => processList.find(({ pid: originalPid }) => originalPid === pid))
    if (!anySelectedProcessExist && startedInterval) {
      toast.info('Service stopped due to target process not found')
      onStop()
    }
  }, [processSpecific, processList, onStop, selectedProcesses, startedInterval])

  return (
    <>
      <div className='flex h-screen flex-col'>
        <img draggable={false} className='w-screen' src={banner} />

        <div className='flex grow flex-col justify-between gap-2 p-3'>

          <div className='flex flex-col justify-between gap-2'>

            <FormContainer
              onClearSection={onResetProcessStates}
              clearButtonDisabled={!!startedInterval}
              title='Application'
              onToggleSwitch={() => setProcessSpecific(val => !val)}
              showSwitch
              switchValue={processSpecific}
              toggleDisabled={!!startedInterval}
            >
              <div className='flex flex-col gap-4 py-2'>
                <AutoComplete options={displayingProcessOptions} onSelect={onSelectProcess} onChange={setFilterKey} value={filterKey} />
                {!!selectedProcesses.size && <div className='flex max-h-[4.5rem] grow-0 flex-wrap gap-2 overflow-y-scroll'>
                  {[...selectedProcesses.values()].map(({ name, pid }, idx) => <Tag key={`${name}-${pid}-${idx}`} onClick={() => onRemoveProcess(pid)} title={`${pid} - ${name}`} />)}
                </div>}
              </div>
            </FormContainer >

            <FormContainer title='Mouse Action'>
              <div className='flex w-48 flex-col gap-4 py-1'>
                <TextInput
                  description='Interval'
                  value={actionIntervalSecond}
                  onChange={(val) => setActionIntervalSecond(Number(val))}
                  type='number'
                  step={5}
                  suffix='s'
                  disabled={!!startedInterval}
                  min={0}
                />

                <div className='flex w-48 flex-col gap-2'>
                  <span className='text-secondary'>Mouse Action</span>
                  <Options disabled={!!startedInterval} options={MOUSE_ACTION_OPTIONS} onSelect={onSelectMouseAction} selectedOption={selectedMouseAction} />
                  <Options disabled={!!startedInterval} options={MOUSE_BUTTON_TYPE_OPTIONS} onSelect={onSelectMouseButton} selectedOption={selectedMouseButton} />
                </div>
              </div>
            </FormContainer>

            <FormContainer title='Settings'>
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

          </div >

          <div className='flex justify-between'>
            <div className='space-x-4'>
              <Button isDisabled={!!startedInterval} onClick={onStart}>Start</Button>
              <Button isDisabled={!startedInterval} onClick={onStop}>Stop</Button>
            </div>
            <Button onClick={() => window.close()}>Exit</Button>
          </div>

        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        toastStyle={{ margin: '12px 24px 24px' }}
        toastClassName='bg-bg-alternative rounded-md border-b-0'
        bodyClassName='font-semibold'
      />
    </>
  )
}

export default App
