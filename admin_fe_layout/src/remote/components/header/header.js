import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'
import LogoTxt from '../../assets/img/logo-txt.svg'

const Header = (props) => {
  return (
    <header className="border-ab-gray-medium fixed top-0 left-0 z-[999] w-full border-b bg-white">
      <div className="flex h-16 w-full px-4 md:items-center md:justify-between md:space-x-4 md:px-6 xl:px-12">
        <div className="flex flex-grow items-center py-2">
          <div className="flex w-full items-center">
            <Link to="/" className="flex flex-shrink-0 items-center focus:outline-none">
              <img className="max-w-[48px]" src={Logo} />
              <img className="lg-lt:hidden ml-3" src={LogoTxt} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
