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

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <AgentSection />
        <FeaturesSection />
        <EditorSection />
        <WhatsNew />
        <ThemeShowcase />
        <KeymapSection />
        <FaqSection />
        <InstallSection />
      </main>
      <Footer />
    </>
  )
}
