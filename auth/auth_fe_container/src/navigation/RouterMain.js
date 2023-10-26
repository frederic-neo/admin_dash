/* eslint-disable max-len */
import React, { lazy } from 'react'
import { Route, Routes, Outlet, Link } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import url_constants from './url_constants'

const {
  LOGIN,
  RESET_PASSWORD,
  VERIFY_EMAIL,
  FORGOT_PASSWORD,
  SIGNUP,
  VERIFY_OTP,
} = url_constants

export const SignUp = () => {
  return (
    <>
      <h1>SignUp</h1>
    </>
  )
}
export const Login = () => {
  return (
    <>
      <h1>Login</h1>
    </>
  )
}

export const Layout = () => {
  return (
    <>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}>
        <Link to='/home'>Home</Link>

        <h2>Auth</h2>
        <Link to={'login'}>Login</Link>
        <Link to={'signup'}>Signup</Link>
      </nav>

      <main style={{ padding: '1rem 0' }}>
        <Outlet />
      </main>
    </>
  )
}

const RouterMain = ({ match }) => {
  /* 
Hi Jishnu Bro 

I am trying to understand how to use the federated components in the react router v6.
I have tried the following code snippets:
please refer the proto im sending 

i have commented the lazy loaded components for now 
and even the layout component below.

when page is reloaded in route /auth/login or /auth/signup nothing turns up

*/

  // console.log(match)
  // const Login = lazy(() => import('../federated_components/login/login'))
  // const VerifyEmail = lazy(() =>
  //   import('../federated_components/verify-email/verify-email')
  // )
  // const VerifyOtp = lazy(() =>
  //   import('../federated_components/verify-otp/verify-otp')
  // )
  // const ResetPassword = lazy(() =>
  //   import('../federated_components/reset-password/reset-password')
  // )
  // const ForgotPassword = lazy(() =>
  //   import('../federated_components/forgot-password/forgot-password')
  // )
  // const SignUp = lazy(() => import('../federated_components/signup/signup'))

  return (
    <>
      <h2>Auth</h2>
      <Link to={'login'}>Login</Link>
      <Link to={'signup'}>Signup</Link>

      <Routes>
        {/* <Route path='/' element={<Layout />}> */}
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        {/* </Route> */}
      </Routes>
    </>
  )
}

export default RouterMain
