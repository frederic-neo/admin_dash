import React from 'react'
import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types'
import PaginationNextIcon from '../assets/img/icons/pagination-next.svg'
import PaginationPrevIcon from '../assets/img/icons/pagination-prev.svg'

const Pagination = (props) => {
  // const { totalCount, handlePageChange, selected } = props
  const handlePageChange = (e) => {
    console.log(e.selected)
  }
  const totalCount = 10

  return (
    <div className="float-left mt-2 flex w-full flex-wrap items-center justify-center p-3 md:justify-between">
      <div className="list-pagination-wrapper mt-4 flex items-center">
        <ReactPaginate />
      </div>
    </div>
  )
}

export default Pagination
