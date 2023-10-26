import React from 'react'

const BlockCard = ({ blockCount }) => {
  return (
    <div className="float-left w-full">
      <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(blockCount)?.map((blockCard) => (
          <div key={blockCard[0]} className="border-ab-gray-medium flex w-full flex-col justify-between border p-6">
            <h2 className="text-ab-sm text-ab-black">{blockCard[1][0]}</h2>
            <p className="text-ab-black mt-3 truncate text-2xl font-medium">{blockCard[1][1]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlockCard
