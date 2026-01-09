import { describe, it, expect } from 'vitest'
import { render, screen } from './test/utils'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    // Since we're redirecting to /dashboard, we should see loading or redirect
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})

