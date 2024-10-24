import { set, add, edit, remove } from 'app/store/reducers/bid.reducer'
import { cometAPI } from 'app/utils/functions.util'

export const getUrlInfos = () => async dispatch => {
  try {
    const response = await cometAPI('get', '/api/bid')

    if (response.message === 'success') {
      dispatch(set(response.data))
      return true
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

export const addUrlInfo = (data) => async dispatch => {
  try {
    const response = await cometAPI('put', '/api/bid', data)
    if (response.message === 'success') {
      dispatch(add(response.data))
      return true
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

export const editUrlInfo = (data) => async dispatch => {
  try {
    const response = await cometAPI('patch', `/api/bid/${data.id}`, data)
    if (response.message === 'success') {
      dispatch(edit(response.data))
      return true
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

export const removeUrlInfo = (data) => async dispatch => {
  try {
    const response = await cometAPI('delete', `/api/bid/${data.id}`)
    if (response.message === 'success') {
      dispatch(remove(response.data))
      return true
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
