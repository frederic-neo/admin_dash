import React from 'react'
import NewsLetters from './NewsLetters'

export const Admin_fe_signups = () => {
  return (
    <div className="float-left w-full py-6 px-4">
      <h4 className="text-xl font-semibold">New Signups</h4>

      <div className="float-left w-full overflow-x-hidden py-6">
        <NewsLetters />
      </div>
    </div>
  )
}
export default Admin_fe_signups
