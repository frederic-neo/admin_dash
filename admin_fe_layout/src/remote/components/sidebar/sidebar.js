import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import HomeIcon from '../../assets/img/icons/home.svg'
import MsgErrorIcon from '../../assets/img/icons/msg-error.svg'

const Sidebar = () => {
  const location = useLocation()
  const sidebarLinks = [
    {
      name: 'home',
      label: 'Home',
      icon: HomeIcon,
      link: '/',
    },
    {
      name: 'signups',
      label: 'Signups',
      icon: HomeIcon,
      link: '/signups',
    },
    {
      name: 'spaces',
      label: 'Spaces Created',
      icon: HomeIcon,
      link: '/spaces-created',
    },
    {
      name: 'blocksCreated',
      label: 'Blocks Created',
      icon: HomeIcon,
      link: '/blocks-created',
    },
    {
      name: 'blocksPushed',
      label: 'Blocks Pushed',
      icon: HomeIcon,
      link: '/blocks-pushed',
    },
    {
      name: 'newsLetters',
      label: 'NewsLetters Added',
      icon: HomeIcon,
      link: '/newsletters-added',
    },
  ]

  return (
    <div className="custom-scroll-primary float-left flex h-full w-full flex-col justify-between overflow-auto pr-2">
      <div className="float-left w-full">
        <div className="float-left mb-2 w-full">
          {sidebarLinks.map((link) => (
            <Link
              to={link.link}
              key={link.name}
              className={`text-ab-sm hover:text-primary hover:bg-ab-gray-light group flex w-full cursor-pointer items-center space-x-2 py-2 px-3 font-semibold leading-normal transition-all ${
                location.pathname === link.link ? 'text-primary bg-ab-gray-light' : 'text-ab-black'
              }`}
            >
              <img
                className={`group-hover:fill-primary flex-shrink-0 text-green-500 ${
                  location.pathname === link.link ? 'fill-primary' : 'fill-[#484848]'
                }`}
                src={link.icon}
                alt="Message Error"
              ></img>
              <p className="truncate">{link.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
