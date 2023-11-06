import React, { useEffect, useState, useCallback } from 'react'
import apiHelper from './common/apiGetters'
import { debounce } from 'lodash'
import Pagination from './pagination/pagination'
import SpaceCard from './spaceCard'
// import useOnclickOutside from 'react-cool-onclickoutside'

// import { Link } from 'react-router-dom'
// import FilterIcon from './assets/img/icons/filter-icon.svg'

// import Filter from './Filter'
// import Popup from 'reactjs-popup'
// import 'reactjs-popup/dist/index.css'

// import { apiHelper } from './apiGetters'
// import { TypeFilter } from './Filter/FilterConstants'
const SpaceList = () => {
  const page_limit = Number(process.env.BB_ADMIN_DASH_PAGE_LIMIT)
  console.log(Pagination)
  const [spacesCount, setSpacesCount] = useState(null)
  const [spaceData, setSpaceData] = useState(null)
  const [loader, setLoader] = useState(true)
  const [flag, setFlag] = useState(false)
  const [totalCount, setTotalCount] = useState(null)
  const [selectedPage, setSelectedPage] = useState(0)
  const [searchText, setSearchText] = useState(null)

  const count = {
    totalNoOfSpaces: spacesCount,
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true)
        const res = await apiHelper({
          baseUrl: process.env.BB_ADMIN_DASH_FUNCTION_URL,
          subUrl: '/admin_be_spacesCreatedList',
          value: { start_date: null, end_date: null, name_filter: searchText, offset: 0, page_limit },
        })
        if (res) {
          setSpacesCount(res.totalNoOfSpaces)
          setTotalCount(res.spaceCount)
          setSpaceData(res.spaceData)
        }
        setLoader(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoader(false)
      }
    }
    fetchData()
  }, [searchText, flag])

  const handlePageChange = (event) => {
    const { selected } = event
    setSelectedPage(selected)
    setFlag((flag) => !flag)
  }

  const handler = useCallback(
    debounce((text) => {
      setSpaceData(null)
      setSearchText(text)
      setSelectedPage(0)
      setFlag((flag) => !flag)
    }, 1000),
    []
  )

  const onSearchTextChange = (e) => {
    handler(e.target.value)
  }

  return (
    <>
      <SpaceCard spaceCount={count} />
      <div className={`border-ab-gray-dark float-left mt-3.5 w-full border`}>
        <div className="border-ab-gray-dark float-left flex w-full items-center justify-between space-x-3 border-b">
          <div className="lg-lt:flex-grow float-left overflow-hidden lg:w-1/2">
            <input
              type="text"
              onChange={onSearchTextChange}
              className="search-input lg-lt:max-w-[320px] border-ab-gray-dark h-10 w-full !bg-[length:14px_14px] px-2 pl-8 text-sm focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="custom-h-scroll-primary float-left w-full overflow-x-auto">
          <table className="text-ab-black min-w-full text-left">
            <thead>
              <tr className="bg-ab-gray-light align-top">
                <th className="whitespace-nowrap p-3 pt-3.5 text-sm font-normal border-l">Name</th>
                <th className="whitespace-nowrap p-3 pt-3.5 text-sm font-normal border-l">Email</th>
                <th className="whitespace-nowrap p-3 pt-3.5 text-sm font-normal border-l">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {spaceData?.map((space, index) => (
                <tr
                  key={space.space_id}
                  className={`border-ab-gray-dark text-ab-sm border-t align-top ${
                    space.checkedStatus ? 'bg-ab-gray-light' : ''
                  }`}
                >
                  <td className="whitespace-nowrap p-3 pt-3.5 text-xs border-l">{space?.name}</td>
                  <td className="whitespace-nowrap p-3 pt-3.5 text-xs border-l">{space?.email}</td>
                  <td className="whitespace-nowrap p-3 pt-3.5 text-xs border-l">
                    {new Date(space?.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!spaceData && !loader && (
            <div className="flex justify-center items-center border-t">
              <span className="text-ab-black float-left w-full py-10 text-center text-sm">No Spaces Found</span>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* {totalCount > page_limit && (
          <Pagination
            pageCount={Math.ceil(totalCount / page_limit)}
            handlePageChange={handlePageChange}
            selected={selectedPage}
          />
        )} */}
      </div>
    </>
  )
}

export default SpaceList
