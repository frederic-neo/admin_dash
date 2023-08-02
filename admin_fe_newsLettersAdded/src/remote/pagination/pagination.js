import React from 'react'
import './pagination.scss'
import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types'
import PaginationNextIcon from '../assets/img/icons/pagination-next.svg'
import PaginationPrevIcon from '../assets/img/icons/pagination-prev.svg'

const Pagination = (props) => {
  const { totalCount, handlePageChange, selected } = props

  return (
    <div className="float-left mt-2 flex w-full flex-wrap items-center justify-center p-3 md:justify-between">
      {/* <p className="text-xs text-gray-dark mt-4">Showing 1 of 3 items</p> */}
      <div className="list-pagination-wrapper mt-4 flex items-center">
        <ReactPaginate
          className="flex items-center"
          breakLabel="..."
          pageLinkClassName="flex items-center justify-center text-gray-dark text-sm rounded-md px-2 py-1 min-w-[32px] h-8 border border-gray-dark text-center hover:bg-ab-gray-light cursor-pointer focus:outline-none select-none"
          pageClassName="mx-0.5 rounded-md"
          nextLinkClassName="flex items-center justify-center rounded-md px-2 py-1 min-w-[32px] h-8 border border-ab-gray-dark text-center hover:bg-ab-gray-light cursor-pointer ml-0.5 focus:outline-none select-none"
          previousLinkClassName="flex items-center justify-center rounded-md px-2 py-1 min-w-[32px] h-8 border border-ab-gray-dark text-center hover:bg-ab-gray-light cursor-pointer mr-0.5 focus:outline-none select-none"
          disabledLinkClassName="opacity-40 hover:bg-transparent cursor-default"
          breakLinkClassName="flex items-center justify-center rounded-md px-2 py-1 min-w-[32px] h-8 border border-ab-gray-dark text-center hover:bg-ab-gray-light cursor-pointer mr-0.5 focus:outline-none select-none"
          nextLabel={<img src={PaginationNextIcon} alt="next" />}
          previousLabel={<img src={PaginationPrevIcon} alt="prev" />}
          activeLinkClassName="!bg-[#F5F0FF]"
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          pageCount={totalCount}
          renderOnZeroPageCount={null}
          forcePage={selected}
        />
      </div>
    </div>
  )
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
}

export default Pagination
