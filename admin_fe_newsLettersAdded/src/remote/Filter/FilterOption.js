import React from 'react'
import PropTypes from 'prop-types'

const FilterOption = (props) => {
  const { name, onFilterChange, checked } = props

  return (
    <label className='float-left flex max-w-full cursor-pointer items-center leading-normal'>
      <input
        className='peer hidden'
        type='checkbox'
        checked={checked}
        onChange={() => onFilterChange(name.slug)}
      />
      <span className='chkbox-icon border-ab-disabled float-left mr-2 h-5 w-5 flex-shrink-0 cursor-pointer rounded border bg-white'></span>
      <p className='text-ab-sm text-ab-black truncate font-medium tracking-tight'>
        {name.value}
      </p>
    </label>
  )
}

FilterOption.propTypes = {
  name: PropTypes.shape({
    value: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    colorCode: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
}

export default FilterOption
