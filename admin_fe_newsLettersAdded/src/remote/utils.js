const debounce = (func, wait) => {
  let timeoutId

  const debounced = (...args) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }

  debounced.cancel = () => {
    clearTimeout(timeoutId)
  }

  return debounced
}

const calculatePagesCount = (pageSize, totalCountx) => (totalCountx < pageSize ? 1 : Math.ceil(totalCountx / pageSize))

export { debounce, calculatePagesCount }
