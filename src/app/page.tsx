import React from 'react'
import SiteHeader from '@/components/header/SiteHeader'
import HeroSection from '@/components/hero/HeroSection'
import AgentSection from '@/components/agents/AgentSection'
import FeaturesSection from '@/components/features/FeaturesSection'
import EditorSection from '@/components/editor/EditorSection'
import WhatsNew from '@/components/release/WhatsNew'
import ThemeShowcase from '@/components/themes/ThemeShowcase'
import KeymapSection from '@/components/keymap/KeymapSection'
import FaqSection from '@/components/faq/FaqSection'
import InstallSection from '@/components/install/InstallSection'
import Footer from '@/components/footer/Footer'
import { getLatestRelease } from '@/lib/latest-release'

export default async function Page() {
  const release = await getLatestRelease()

  return (
    <>
      <SiteHeader dmgUrl={release.dmgUrl} />
      <main id="main-content">
        <HeroSection release={release} />
        <AgentSection />
        <FeaturesSection />
        <EditorSection />
        <WhatsNew />
        <ThemeShowcase dmgUrl={release.dmgUrl} version={release.version} />
        <KeymapSection />
        <FaqSection />
        <InstallSection dmgUrl={release.dmgUrl} version={release.version} />
      </main>
      <Footer />
    </>
  )
}
