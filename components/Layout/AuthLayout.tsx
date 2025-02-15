import React from 'react'
import { LayoutProps } from '../../models/layout'

const AuthLayout = ({children}: LayoutProps) => {
  return (
    <div>{children}</div>
  )
}

export default AuthLayout