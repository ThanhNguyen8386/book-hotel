import React, { useEffect, useState } from 'react'
import { LayoutProps } from '../../models/layout'
import BackToTop from '../BackToTop'
import Footer from '../Footer'
import Header from '../Header'
import { useRouter } from 'next/router'

type Props = {}

const SiteLayout = ({ children }: LayoutProps) => {
  const [visible, setVisible] = useState(true);
  const [showFooter, setShowFooter] = useState(false)
  const router = useRouter()
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 150) {
      setVisible(false)
    }
    else if (scrolled <= 150) {
      setVisible(true)
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible)
  }, [])
  useEffect(() => {
    if (router.isReady) {
      const isProfilePage = router.pathname.startsWith('/profile')
      if (isProfilePage) setShowFooter(false)
      else setShowFooter(true)
    }
  }, [])
  return (
    <div className="w-[90%] mx-auto">
      <Header />
      {children}
      <BackToTop visible={visible} />
      {showFooter && <Footer />}
    </div>
  )
}

export default SiteLayout