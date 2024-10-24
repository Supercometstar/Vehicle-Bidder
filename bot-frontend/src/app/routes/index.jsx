import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Snackbar, Alert } from '@mui/material'

import { hide } from 'app/store/reducers/notification.reducer'
import { getUrlInfos } from 'app/store/actions/bid.action'

import SignIn from 'app/pages/SignIn'
import Verification from 'app/pages/Verification'
import Bot from 'app/pages/Bot'


import { privateRoute } from 'app/utils/functions.util'

function AppRouter() {

  const dispatch = useDispatch()

  const state = useSelector(store => store.notification.state)
  const message = useSelector(store => store.notification.message)
  const open = useSelector(store => store.notification.open)

  const handleClose = () => {
    dispatch(hide())
  }

  useEffect(() => {
    setInterval(() => {
      dispatch(getUrlInfos())
    }, 2000)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/" element={privateRoute(Bot)} />
        </Routes>
      </Router>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        message={message}
      >
        <Alert
          onClose={handleClose}
          severity={state?'success':'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AppRouter