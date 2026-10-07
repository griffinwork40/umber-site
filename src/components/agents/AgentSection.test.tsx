import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AgentSection from './AgentSection'
import { AGENT_LOOP } from '@/lib/agents'
import { AGENT_TOOLS } from '@/lib/constants'

describe('AgentSection', () => {
  it('renders without throwing', () => {
    render(<AgentSection />)
  })

  it('has section element with id="agents"', () => {
    const { container } = render(<AgentSection />)
    expect(container.querySelector('section#agents')).toBeInTheDocument()
  })

  it('renders the exact h2 heading', () => {
    render(<AgentSection />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Your agent is working. You are allowed to leave.',
      })
    ).toBeInTheDocument()
  })

  it('renders all six AGENT_LOOP titles', () => {
    render(<AgentSection />)
    AGENT_LOOP.forEach((point) => {
      expect(screen.getByText(point.title)).toBeInTheDocument()
    })
  })

  it('renders all six AGENT_LOOP detail texts', () => {
    render(<AgentSection />)
    AGENT_LOOP.forEach((point) => {
      expect(screen.getByText(point.detail)).toBeInTheDocument()
    })
  })

  it('renders six loop cards (one per AGENT_LOOP entry)', () => {
    render(<AgentSection />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(AGENT_LOOP.length)
  })

  it('renders all AGENT_TOOLS names', () => {
    render(<AgentSection />)
    AGENT_TOOLS.forEach((tool) => {
      expect(screen.getByText(tool.name)).toBeInTheDocument()
    })
  })

  it('renders all AGENT_TOOLS descriptions', () => {
    render(<AgentSection />)
    AGENT_TOOLS.forEach((tool) => {
      expect(screen.getByText(tool.description)).toBeInTheDocument()
    })
  })

  it('has the eyebrow label "agent-native"', () => {
    render(<AgentSection />)
    expect(screen.getByText('agent-native')).toBeInTheDocument()
  })

  it('has the "Runs whatever you run" tools row label', () => {
    render(<AgentSection />)
    expect(screen.getByText('Runs whatever you run')).toBeInTheDocument()
  })

  it('labels the section region with its heading', () => {
    render(<AgentSection />)
    expect(screen.getByRole('region', { name: 'Your agent is working. You are allowed to leave.' })).toBeInTheDocument()
  })
})
