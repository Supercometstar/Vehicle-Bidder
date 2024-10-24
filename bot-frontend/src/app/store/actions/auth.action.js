import { loginSuccess, logout } from 'app/store/reducers/auth.reducer'
import { cometAPI } from 'app/utils/functions.util'

export const verify = verifyCode => async dispatch => {
  try {
    const response = await cometAPI('patch', '/api/auth', { verifyCode })
    if (response.message === 'success') {
      dispatch(loginSuccess(response))
      localStorage.setItem('token', response.token)
      return true
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

export const loginUser = credentials => async dispatch => {
  try {
    const response = await cometAPI('post', '/api/auth', credentials);
    if (response.message === 'success') {
      dispatch(loginSuccess(response));
      localStorage.setItem('token', response.token);
      return true
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
};

export const logoutUser = () => async dispatch => {
  try {
    const response = await cometAPI('delete', '/api/auth')
    if (response.message === 'success') {
      dispatch(logout())
      localStorage.removeItem('token')
      return true
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

export const autoLogin = () => async dispatch => {
  try {
    const response = await cometAPI('get', '/api/auth')
    if (response.message === 'success') {
      dispatch(loginSuccess(response))
      localStorage.setItem('token', response.token)
      return true
    }else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}