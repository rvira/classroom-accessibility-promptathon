import type { ReactNode } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import './SourceDetails.css'

/** Place beneath a summary; never hide essential constraints only here. */
export function SourceDetails({ children, label = 'View original instructions' }: {
  children: ReactNode
  label?: string
}) {
  return (
    <Accordion.Root type="single" collapsible className="signal-source">
      <Accordion.Item value="source">
        <Accordion.Header className="signal-source-heading">
          <Accordion.Trigger className="signal-source-trigger">
            {label}<ChevronDown size={20} aria-hidden="true" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="signal-source-content">
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
