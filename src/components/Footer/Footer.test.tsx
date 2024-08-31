import { render, screen } from '@testing-library/react'
import { Footer } from './'

describe('<Footer />', () => {
  it('should render correctly', () => {
    render(<Footer />)

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/paclaraujo')
    expect(screen.getByText('Desenvolvido por')).toBeInTheDocument()
    expect(screen.getByText('@Paloma Araujo')).toBeInTheDocument()
  })
})