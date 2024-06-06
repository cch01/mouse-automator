import { render } from '@testing-library/react'

import { Header } from '../Header'

describe('Header', () => {
  it('renders correctly', () => {
    const res = render(<Header />)

    expect(res).toMatchSnapshot()
  })
})
