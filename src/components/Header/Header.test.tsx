import { render, screen } from '@testing-library/react'
import { Header } from './'

describe('<Header />', () => {
  it('should render correctly', () => {
    render(<Header />)

    expect(screen.getByRole('img')).toHaveAttribute('src', '/assets/logo.svg')
    expect(screen.getByText('Explore o universo')).toBeInTheDocument()
    expect(screen.getByText('Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!')).toBeInTheDocument()
  })
})