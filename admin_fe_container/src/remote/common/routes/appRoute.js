import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const AppRoute = () => {
  const Layout = lazy(() => import('../../components/Layout/index'))
  const NewsLettersAdded = lazy(() => import('../../components/NewsLettersAdded/index'))

  return (
    <Suspense fallback="">
      <Routes>
        <Route path="/" element={<Layout />} exact />
        <Route path="/newsLettersAdded" element={<NewsLettersAdded />} exact />
      </Routes>
    </Suspense>
  )
}

export default AppRoute
