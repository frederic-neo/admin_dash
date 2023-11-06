import React from 'react'
import SpaceList from './spaceList'

export const Admin_fe_spaceCreatedList = () => {
  return (
    <div className="float-left w-full py-6 px-4">
      <h4 className="text-xl font-semibold">Spaces Created</h4>

      <div className="float-left w-full overflow-x-hidden py-6">
        <SpaceList />
      </div>
    </div>
  )
}
export default Admin_fe_spaceCreatedList
