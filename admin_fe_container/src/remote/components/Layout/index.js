import React, { Suspense, lazy } from 'react'

const NewsLettersAdded = lazy(() => import('../../components/NewsLettersAdded/index'))

export const Layout = () => {
  return (
    <div>
      <h1 className="text-center" aria-label="para">
        Welcome to our newsletter page
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <NewsLettersAdded />
      </Suspense>
    </div>
  )
}

export default Layout
