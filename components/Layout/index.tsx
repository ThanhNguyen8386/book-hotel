import React, { useEffect, useState } from 'react'
import { LayoutProps } from '../../models/layout'
import BackToTop from '../BackToTop'
import Footer from '../Footer'
import Header from '../Header'

type Props = {}

const SiteLayout = ({ children }: LayoutProps) => {
  const [visible, setVisible] = useState(true);

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
  return (
    <div className="">
      <Header />
      {children}
      <BackToTop visible={visible} />
      <Footer />
    </div>
  )
}

export default SiteLayout