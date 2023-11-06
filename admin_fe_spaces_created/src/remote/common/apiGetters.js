import axios from 'axios'
import { shield } from '@appblocks/js-sdk'

export const apiHelper = async ({ baseUrl, subUrl, value = null, apiType = 'post' }) => {
  const token = shield.tokenStore.getToken()
  try {
    const { data } = await axios({
      method: apiType,
      url: `${baseUrl}${subUrl}`,
      data: value,
      headers: token && {
        Authorization: `Bearer ${token}`,
      },
    })
    return data?.data
  } catch (err) {
    console.log(err)
  }
}

export default apiHelper
