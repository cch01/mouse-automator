import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../Button'

describe('Button', () => {
  it('renders correctly', () => {
    const onClick = vi.fn()
    const btnText = 'testing'
    render(<Button onClick={onClick}>{btnText}</Button>)

    const btnElement = screen.getByRole('button', { name: btnText })
    expect(btnElement).toBeInTheDocument()
  })

  it('renders disabled btn correctly', () => {
    const onClick = vi.fn()
    const btnText = 'testing'
    render(
      <Button isDisabled onClick={onClick}>
        {btnText}
      </Button>
    )

    const btnElement = screen.getByRole('button', { name: btnText })
    expect(btnElement).toBeDisabled()
  })

  it('can be clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const btnText = 'testing'
    render(<Button onClick={onClick}>{btnText}</Button>)

    const btnElement = screen.getByRole('button', { name: btnText })
    await user.click(btnElement)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('can not be clicked when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const btnText = 'testing'
    render(
      <Button isDisabled onClick={onClick}>
        {btnText}
      </Button>
    )

    const btnElement = screen.getByRole('button', { name: btnText })
    await user.click(btnElement)
    expect(onClick).toHaveBeenCalledTimes(0)
  })
})
