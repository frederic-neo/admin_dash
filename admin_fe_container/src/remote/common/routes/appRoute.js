import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const AppRoute = () => {
  const Layout = lazy(() => import('../../components/Layout/index'))
  const NewsLettersAdded = lazy(() => import('../../components/NewsLettersAdded/index'))
  const SignUps = lazy(() => import('../../components/SignUps/index'))
  const SpacesCreated = lazy(() => import('../../components/SpacesCreated/index'))
  const BlocksCreated = lazy(() => import('../../components/BlocksCreated/index'))
  const BlocksPushed = lazy(() => import('../../components/BlocksPushed/index'))

  return (
    <Suspense fallback="">
      <Routes>
        <Route path="/" element={<Layout />} exact />
        <Route path="/newsletters-added" element={<NewsLettersAdded />} exact />
        <Route path="/signups" element={<SignUps />} exact />
        <Route path="/spaces-created" element={<SpacesCreated />} exact />
        <Route path="/blocks-created" element={<BlocksCreated />} exact />
        <Route path="/blocks-pushed" element={<BlocksPushed />} exact />
      </Routes>
    </Suspense>
  )
}

export default AppRoute
