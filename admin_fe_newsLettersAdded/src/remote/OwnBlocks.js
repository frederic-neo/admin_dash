import React, { useState, useEffect, useRef, useCallback } from 'react'
// import useOnclickOutside from 'react-cool-onclickoutside'

import { Link } from 'react-router-dom'
import Pagination from './pagination/pagination'
import FilterIcon from './assets/img/icons/filter-icon.svg'

import Filter from './Filter'
// import Popup from 'reactjs-popup'
// import 'reactjs-popup/dist/index.css'
// import { apiHelper } from './apiGetters'
import { TypeFilter } from './Filter/FilterConstants'
import BlockCard from './blockCard'

const OwnBlocks = () => {
  const purchaseData = [
    {
      id: '00064210-38ba-4aa9-9bf7-825838d9f39f',
      email: 'sajin.abdu@gmail.com',
      status: 2,
      created_at: '2023-07-07T05:42:23.652Z',
      updated_at: '2023-07-07T21:45:49.549Z',
    },
    {
      id: '5eb2f406-c736-4516-b0f2-780f869bb977',
      email: 'jishnu.nb@neoito.com',
      status: 2,
      created_at: '2023-07-04T05:48:04.833Z',
      updated_at: '2023-07-04T05:48:45.180Z',
    },
  ]

  const count = {
    totalNoOfUsers: 1,
    subscribedUsers: 1,
    unsubscribedUsers: 1,
  }

  return (
    <>
      <BlockCard blockCount={count} />
      <div className={`border-ab-gray-dark float-left mt-3.5 w-full border`}>
        <div className="border-ab-gray-dark float-left flex w-full items-center justify-between space-x-3 border-b">
          <div className="lg-lt:flex-grow float-left overflow-hidden lg:w-1/2">
            <input
              type="text"
              className="search-input lg-lt:max-w-[320px] border-ab-gray-dark h-10 w-full !bg-[length:14px_14px] px-2 pl-8 text-sm focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="custom-h-scroll-primary float-left w-full overflow-x-auto">
          <table className="text-ab-black min-w-full text-left">
            <thead>
              <tr className="bg-ab-gray-light align-top">
                <th className="whitespace-nowrap p-3 pt-3.5 text-sm font-normal border-l">Email</th>
                <th className="whitespace-nowrap p-3 pt-3.5 text-sm font-normal border-l">Status</th>
                <th className="whitespace-nowrap p-3 pt-3.5 text-sm font-normal border-l">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData?.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-ab-gray-dark text-ab-sm border-t align-top ${
                    item.checkedStatus ? 'bg-ab-gray-light' : ''
                  }`}
                >
                  <td className="whitespace-nowrap p-3 pt-3.5 text-xs border-l">{item?.email}</td>
                  <td className="whitespace-nowrap p-3 pt-3.5 text-xs border-l">{item?.status}</td>
                  <td className="whitespace-nowrap p-3 pt-3.5 text-xs border-l">
                    {new Date(item?.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!purchaseData && (
            <div className="flex justify-center items-center border-t">
              <span className="text-ab-black float-left w-full py-10 text-center text-sm">No Blocks Found</span>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* {totalCount > 1 && (
          // <Pagination handlePageChange={handlePageChange} selected={selectedPage} totalCount={totalCount} />
        )} */}
      </div>
    </>
  )
}

export default OwnBlocks
