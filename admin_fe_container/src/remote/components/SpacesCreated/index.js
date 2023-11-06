import React from 'react'
import { useFederatedComponent } from '@appblocks/js-sdk'

const SpacesCreated = (props) => {
  const system = {
    module: './admin_fe_spacesCreatedList',
    scope: 'remotes',
    url: process.env.BB_ADMIN_DASH_ELEMENTS_URL,
  }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    system?.url,
    system?.scope,
    system?.module,
    React
  )
  return (
    <React.Suspense fallback={''}>
      {errorLoading ? `Error loading module "${module}"` : FederatedComponent && <FederatedComponent {...props} />}
    </React.Suspense>
  )
}

export default SpacesCreated
