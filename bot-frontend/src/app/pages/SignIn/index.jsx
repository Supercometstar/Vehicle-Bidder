import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container, Box, Typography, TextField, Button, Avatar, Checkbox } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { blue } from '@mui/material/colors'

import { loginUser, autoLogin } from 'app/store/actions/auth.action'
import { show } from 'app/store/reducers/notification.reducer'

export default function CredentialsSignInPage() {

  const checkboxRef = useRef('checkbox')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const signIn = async () => {
    console.log(email, password)
    const result = await dispatch(loginUser({ 
      email,
      password
    }))
    if (result) {
      dispatch(show({ message: 'Login Successfully!', state: true }))
      navigate('/verify')
    }else {
      dispatch(show({ message: 'Login Failed!', state: false }))
    }
  }

  const handleChange = (e, func) => {
    func(e.target.value)
  }

  useEffect(() => {

    const _ = async () => {
      const result = await dispatch(autoLogin())
      if (result) {
        dispatch(show({ message: 'Auto Logined!', state: true }))
        navigate('/')
      }
    }
    _()

  }, [ dispatch, navigate ])

  return (
    <Container maxWidth='xs' sx={{ border: '1px solid rgb(180, 180, 180)', p: 5, mt: 5, borderRadius: '5px' }}>
      <Box sx={{ alignItems: 'center', flexDirection: 'column', display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '100%' }}>
          <Avatar sx={{ mr: 1 }} src='/assets/images/favicon.png' variant='rounded' />          
          <Typography className='animation-1' variant='h4' sx={{ pt: 1, fontWeight: 'bold' }}>Vehicle Bidder</Typography>
        </Box>      
        <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
          <Typography variant='body2' sx={{ textAlign: 'left' }}>SIGN IN WITH EMAIL</Typography>
          <TextField name='email' sx={{ width: '100%', mb: 2, '& input': { pt: 1.5, pb: 1.5 }, '& label': { mt: -0.5 } }} onChange={(e) => { handleChange(e, setEmail) }} />

          <Typography variant='body2' sx={{ textAlign: 'left' }}>PASSWORD</Typography>
          <TextField name='password' sx={{ width: '100%', '& input': { pt: 1.5, pb: 1.5 }, '& label': { mt: -0.5 } }} onChange={(e) => { handleChange(e, setPassword) }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Checkbox ref={checkboxRef} />
            <Typography variant='body2' sx={{ cursor: 'pointer' }} onClick={() => {checkboxRef.current.children[0].click()}}>Remember me</Typography>
          </Box>

          <Button className='button-85' variant='contained' disableElevation sx={{ width: '70%', pt: 1, pb: 1 }} onClick={signIn} >Sign In</Button>
        </Box>
      </Box>
    </Container>
  )
}
