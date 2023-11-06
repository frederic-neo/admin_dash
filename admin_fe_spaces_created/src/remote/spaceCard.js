import React from 'react'

const SpaceCard = ({ spaceCount }) => {
  const spaceCards = [
    {
      slug: 'totalNoOfSpaces',
      content: 'Total Number of Spaces',
    },
  ]

  return (
    <div className="float-left w-full">
      <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {spaceCards?.map((spaceCard, index) => (
          <div key={spaceCard?.slug} className="border-ab-gray-medium flex w-full flex-col justify-between border p-6">
            <h2 className="text-ab-sm text-ab-black">{spaceCard?.content}</h2>
            <p className="text-ab-black mt-3 truncate text-2xl font-medium">{spaceCount[spaceCard.slug]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpaceCard
