import React, { useState, useEffect, useRef, useCallback } from 'react'
// import useOnclickOutside from 'react-cool-onclickoutside'

import { Link } from 'react-router-dom'
import Pagination from './pagination/pagination'
import FilterIcon from './assets/img/icons/filter-icon.svg'

import Filter from './Filter'
// import Popup from 'reactjs-popup'
// import 'reactjs-popup/dist/index.css'
import { debounce, calculatePagesCount } from './utils'
import { apiHelper } from './apiGetters'
import { TypeFilter } from './Filter/FilterConstants'
import BlockCard from './blockCard'

const NewsLetters = () => {
  const PAGE_LIMIT = 10

  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [selectedPage, setSelectedPage] = useState(0)

  const count = {
    totalNoOfUsers: ['Total Number of Subscriptions', totalCount],
    subscribedUsers: ['Total Currently Subscribed', 1],
    unsubscribedUsers: ['Total Currently Unsubscribed', 2],
  }

  const setPageNumber = (pageNumber) => {
    setSelectedPage(pageNumber)
  }
  const debouncedSetPageNumber = debounce(setPageNumber, 1000)

  const handlePageChange = (event) => {
    const { selected } = event
    debouncedSetPageNumber(selected)
  }

  const filterDataStructure = () => ({
    start_date: '2021-05-01',
    end_date: '2023-07-30',
    status: 2,
    page_limit: PAGE_LIMIT,
  })

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("REFRESH_TOKEN")}`,
  }

  const fetchData = async () => {
    setLoader(true)
    setData([])
    const res = await apiHelper(
      process.env.BB_ADMIN_DASH_FUNCTION_URL,
      '/admin_be_newsLettersAddedList',
      filterDataStructure(),
      headers,
      'get',
      true
    )
    setData(res?.data)
    setTotalCount(res?.total_count)
    setLoader(false)
  }

  const debouncedFetchData = debounce(fetchData, 1000)

  useEffect(() => {
    debouncedFetchData()
  }, [selectedPage])

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
              {data?.map((item, index) => (
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
          {!data && (
            <div className="flex justify-center items-center border-t">
              <span className="text-ab-black float-left w-full py-10 text-center text-sm">No Blocks Found</span>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* <Pagination handlePageChange={handlePageChange} selected={selectedPage} totalCount={calculatePagesCount(PAGE_LIMIT, totalCount)} /> */}
      </div>
    </>
  )
}

export default NewsLetters
