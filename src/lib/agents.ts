/**
 * Agent-loop copy for the Agents section: what Goblin Portal does while an
 * agent runs and you are somewhere else. Every point cites the app source it
 * describes (goblin-portal repo, v1.7.0 @ 47eaac42).
 */

export interface AgentLoopPoint {
  title: string
  detail: string
}

export const AGENT_LOOP: AgentLoopPoint[] = [
  {
    // source: CommandNotification.swift:81-88, CommandOutcome.swift:47 (10 s threshold)
    title: 'Pinged when it finishes',
    detail:
      'A command that runs 10 seconds or longer in a background tab sends a macOS notification when it ends: succeeded or failed, and how long it took. Watching a spinner is not a job.',
  },
  {
    // source: DocumentStatus+Presentation.swift, CommandOutcome.swift (OSC 133)
    title: 'Status on every tab',
    detail:
      'Long-running commands leave a green or red dot on their tab, and a dim one means still going. OSC 133 does the tracking, so nobody has to read scrollback to find out.',
  },
  {
    // source: SpaceViewController+Splits.swift:6-10 (max 4 panes), SplitStateStore.swift (persisted)
    title: 'Four panes per tab',
    detail:
      'Split right with ⌘⇧\\, down with ⌘⇧-, up to four panes, and the layout survives a relaunch. ⌘⇧H/J/K/L moves focus, because your hands were already there.',
  },
  {
    // source: AppMenu+Navigate.swift:41-47
    title: 'Find the one you lost',
    detail:
      '⌘⇧A fuzzy-searches every Space and tab you have open. It is tmux\'s ctrl-b w, minus the ctrl-b.',
  },
  {
    // source: goblin-portal AFK.md:70 (patches 0002, 0003, 0005)
    title: 'tmux, done properly',
    detail:
      'The vendored emulator carries twelve patches, including fixes for scrollback reflow, alt-buffer bleed across panes and DCS passthrough. The bugs that usually make tmux inside a terminal app a gamble.',
  },
  {
    // source: PasteGuardPolicy.swift:38-46 (any newline, or 1,500+ characters)
    title: 'Paste Guard',
    detail:
      'Pasting anything multi-line asks before it runs. Agents write a lot of scripts, and some of them are for you to read first.',
  },
]
