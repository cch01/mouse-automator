import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Toggle } from '../Toggle'

describe('Toggle', () => {
  it('renders properly when value=[true]', () => {
    const onToggle = vi.fn()
    render(<Toggle onToggle={onToggle} value={true} />)
    const toggleElement = screen.getByRole('checkbox')
    expect(toggleElement).toBeChecked()
  })

  it('renders properly when value=[false]', () => {
    const onToggle = vi.fn()
    render(<Toggle onToggle={onToggle} value={false} />)
    const toggleElement = screen.getByRole('checkbox')
    expect(toggleElement).not.toBeChecked()
  })

  it('can toggle', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<Toggle onToggle={onToggle} value={false} />)
    const toggleElement = screen.getByRole('checkbox')
    await user.click(toggleElement)
    expect(onToggle).toBeCalledWith(true)
  })

  it('can not toggle when disabled', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<Toggle disabled onToggle={onToggle} value={false} />)
    const toggleElement = screen.getByRole('checkbox')
    await user.click(toggleElement)
    expect(onToggle).toBeCalledTimes(0)
  })
})
