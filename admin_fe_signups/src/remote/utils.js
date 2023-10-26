const debounce = (fn, delay) => {
  let timeOutId
  return function (...args) {
    if (timeOutId) {
      clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const calculatePagesCount = (pageSize, totalCountx) => (totalCountx < pageSize ? 1 : Math.ceil(totalCountx / pageSize))

export { debounce, calculatePagesCount }
