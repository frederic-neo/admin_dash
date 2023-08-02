import React, { useState, useEffect } from 'react'

const BlockCard = ({ blockCount }) => {
  const blockCards = [
    {
      slug: 'totalNoOfUsers',
      content: 'Total Number of Users',
    },
    {
      slug: 'subscribedUsers',
      content: '# of Subscribed Users',
    },
    {
      slug: 'unsubscribedUsers',
      content: '# of Unsubscribed Users',
    },
  ]

  return (
    <div className="float-left w-full">
      <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {blockCards?.map((blockCard, index) => (
          <div key={blockCard?.slug} className="border-ab-gray-medium flex w-full flex-col justify-between border p-6">
            <h2 className="text-ab-sm text-ab-black">{blockCard?.content}</h2>
            <p className="text-ab-black mt-3 truncate text-2xl font-medium">{blockCount[blockCard.slug]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlockCard
