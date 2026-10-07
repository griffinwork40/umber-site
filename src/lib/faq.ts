/**
 * FAQ copy. Each answer is limited to what the goblin-portal repo or the v1.7.0
 * release assets can back up; the source sits beside every entry.
 */

import { ASSERTION_COUNT } from './demo'

export interface FaqEntry {
  question: string
  answer: string
}

export const FAQ: FaqEntry[] = [
  {
    // source: product positioning (no AI provider code in app/Sources/GoblinPortal)
    question: 'Does it have AI built in?',
    answer:
      'No, on purpose. Bring Claude Code, Codex, Hermes, Agent AFK or whatever ships next week. The terminal hosts your agent; it does not compete with it.',
  },
  {
    // source: goblin-portal LICENSE (MIT); repo is public
    question: 'What does it cost?',
    answer:
      'Nothing. It is MIT licensed and the source is on GitHub. No account, no login, and nobody will ask you to "jump on a quick call".',
  },
  {
    // source: v1.7.0 binary is arm64-only (lipo -info), LSMinimumSystemVersion 14.0
    question: 'Will it run on my Mac?',
    answer:
      'If it runs macOS 14 Sonoma or later on Apple silicon, yes. The release build is arm64 only, so Intel Macs are not supported.',
  },
  {
    // source: goblin-portal app/Package.swift:10 (platforms: [.macOS(.v14)]); AppKit imported across app/Sources/GoblinPortal
    question: 'Is there a Windows version?',
    answer:
      'No. Goblin Portal is Swift and AppKit all the way down, which is where the speed and the 2.5 MB download come from. A Windows port would need a registry entry, a surprise restart, and a progress bar that sits at 99% to build character. Hard pass.',
  },
  {
    // source: spctl -a: "Notarized Developer ID"; stapler validate passed on the v1.7.0 bundle
    question: 'Will macOS let me open it?',
    answer:
      'Yes. Releases are signed with a Developer ID and notarized by Apple, so it opens like any other app. No terminal incantations required.',
  },
  {
    // source: UpdateChecker.swift:11,44 (launch check, 24 h cooldown); no Sparkle dependency
    question: 'How do updates work?',
    answer:
      'It checks GitHub Releases on launch, at most once a day, and Help has a manual check. No Sparkle, no background updater, nothing phoning home in between.',
  },
  {
    // source: goblin-portal AFK.md:40 (contrast gate), check-*.sh scripts
    question: 'Where are the testimonials?',
    answer: `We do not have any yet. We have ${ASSERTION_COUNT} contrast assertions instead, and they have never once asked for a quote tweet.`,
  },
]
