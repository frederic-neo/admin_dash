import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppRoute from './remote/common/routes/appRoute'
import { useFederatedComponent, shield } from '@appblocks/js-sdk'
import { useLocation } from 'react-router-dom'
import './remote/assets/css/main.scss'
import FallbackUI from './remote/common/fallback-ui.js'
import ClipLoader from 'react-spinners/ClipLoader'

function App() {
  const [hasSideNav, setHasSideNav] = useState(true)
  const location = useLocation()

  let pathName = location?.pathname
  let routesWithoutSideNav = ['invitation'] //add pathname here to hide sidenav

  useEffect(() => {
    setHasSideNav(!routesWithoutSideNav.some((path) => pathName.includes(path)))
  }, [location.pathname])

  const handleError = (error, errorInfo) => {
    console.log('Error occured in ', errorInfo.componentStack.split(' ')[5])
  }

  const [system, setSystem] = React.useState(undefined)
  const [isLoggedIn, setIsLoggedIn] = React.useState(true)

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    system?.url,
    system?.scope,
    system?.module,
    React
  )

  function setLayout() {
    setSystem({
      module: './admin_fe_layout',
      scope: 'remotes',
      url: process.env.BB_ADMIN_DASH_ELEMENTS_URL,
    })
  }

  // useEffect(async () => {
  //   await shield.init(process.env.BLOCK_ENV_URL_CLIENT_ID)
  //   if (isLoggedIn) {
  //     setLayout()
  //   } else {
  //     const isLoggedinn = await shield.verifyLogin()
  //     setIsLoggedIn(isLoggedinn)
  //   }
  // }, [isLoggedIn])

  useEffect(() => {
    setLayout()
  }, [])

  const Loader = (
    <div className="h-full w-full flex items-center justify-center">
      <ClipLoader color="#5E5EDD" size={50} />
      <p className="text-black">Loading...</p>
    </div>
  )

  return (
    <ErrorBoundary
      FallbackComponent={FallbackUI}
      onError={handleError}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <div className="App">
        {isLoggedIn ? (
          <React.Suspense fallback={''}>
            {errorLoading ? (
              `Error loading module "${module}"`
            ) : FederatedComponent ? (
              <FederatedComponent showSideNav={hasSideNav}>
                <AppRoute />
              </FederatedComponent>
            ) : (
              <>{Loader}</>
            )}
          </React.Suspense>
        ) : (
          <>{Loader}</>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App
