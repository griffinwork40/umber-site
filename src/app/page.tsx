import React from 'react'
import SiteHeader from '@/components/header/SiteHeader'
import HeroSection from '@/components/hero/HeroSection'
import FeaturesSection from '@/components/features/FeaturesSection'
import AgentSection from '@/components/agents/AgentSection'
import EditorSection from '@/components/editor/EditorSection'
import ThemeShowcase from '@/components/themes/ThemeShowcase'
import InstallSection from '@/components/install/InstallSection'
import KeymapSection from '@/components/keymap/KeymapSection'
import Footer from '@/components/footer/Footer'

export default function Page() {
  return (
    <>
      {/* Skip-nav for keyboard / screen-reader users */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <AgentSection />
        <EditorSection />
        <ThemeShowcase />
        <InstallSection />
        <KeymapSection />
      </main>
      <Footer />
    </>
  )
}
