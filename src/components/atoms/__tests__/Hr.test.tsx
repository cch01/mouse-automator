import { render, screen } from '@testing-library/react'

import { Hr } from '../Hr'

describe('Hr', () => {
  it('renders correctly', () => {
    const res = render(<Hr />)

    expect(res).toMatchSnapshot()
  })

  it('insert classes passed as props', () => {
    render(<Hr className="border-yellow-300" />)
    const hrElement = screen.getByRole('separator')
    expect(hrElement).toHaveClass('border-yellow-300')
  })
})
