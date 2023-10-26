import axios from 'axios'
import { shield } from '@appblocks/js-sdk'

export const apiHelper = async (baseUrl, subUrl, value = null, header = {}, apiType = 'post', justData = false) => {
  const token = localStorage.getItem('REFRESH_TOKEN')
  try {
    const { data } = await axios({
      method: apiType,
      url: `${baseUrl}${subUrl}`,
      data: value && value,
      headers: token && {
        Authorization: `Bearer ${token}`,
        ...header,
      },
    })
    if (justData) return data
    return data?.data
  } catch (err) {
    console.log('msg', err)
    // if (err.response.status === 401) shield.logout()
  }
}

export default apiHelper
