import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import FilterOption from './FilterOption'

const Filter = (props) => {
  const { data, name, displayName, handleFilterChange, selectedOptions } = props
  const options = data?.slice(1)

  const [selected, setSelected] = useState([])
  const isInitialMount = useRef(true)
  const [all, setAll] = useState(false)

  useEffect(() => {
    const initSelected =
      selectedOptions[0] === 'all'
        ? options.map((x) => x.slug)
        : selectedOptions
    setSelected(initSelected)
    setAll(selectedOptions[0] === 'all')
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      const urlslug = all ? ['all'] : selected.length ? selected : null
      const dummy1 = urlslug ? { [name]: urlslug } : {}
      handleFilterChange((x) => {
        delete x[name]
        return { ...x, ...dummy1 }
      })
    }
  }, [JSON.stringify(selected)])

  const onChange = (filterType) => {
    let dummySelected
    if (filterType === 'all') {
      dummySelected = all ? [] : options.map((x) => x.slug)
    } else {
      dummySelected = selected.includes(filterType)
        ? selected.filter((x) => x !== filterType)
        : [...selected, filterType]
    }
    setAll(dummySelected.length === options.length)
    setSelected(dummySelected)
  }

  return (
    <div className='border-ab-gray-medium float-left flex w-full flex-col items-start space-y-4 border-b py-3 last:border-transparent'>
      <p className='text-ab-black text-ab-sm font-medium'>{displayName}</p>
      {data?.map((option) => (
        <FilterOption
          name={option}
          key={option.slug}
          onFilterChange={onChange}
          checked={[...selected, all && 'all'].includes(option.slug)}
        />
      ))}
    </div>
  )
}

Filter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  selected: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  name: PropTypes.string.isRequired,
  extra: PropTypes.element,
  displayName: PropTypes.string.isRequired,
  enableSearch: PropTypes.bool,
}
Filter.defaultProps = {
  extra: null,
  enableSearch: false,
}

export default Filter
