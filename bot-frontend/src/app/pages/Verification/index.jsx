import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container, Grid, Box, Typography, TextField, Button, Avatar, FormControl, OutlinedInput } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { blue } from '@mui/material/colors'

import { verify } from 'app/store/actions/auth.action'
import { show } from 'app/store/reducers/notification.reducer'

const Verification = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const email = useSelector(store => store.auth.email)

  const [ verifyNumber, setVerifyNumber ] = useState('')

  const handleVerify = async () => {
    const result = await dispatch(verify(verifyNumber))
    if (result) {
      dispatch(show({ message: 'Verify successfully!', state: true }))
      navigate('/')
    }else {
      dispatch(show({ message: 'Verify number is wrong!', state: false }))
    }
  }
  
  const handleChange = (e, func) => {
    func(e.target.value)
  }

  return (
    <Container maxWidth='sm' sx={{ border: '1px solid rgb(180, 180, 180)', p: 5, mt: 5, borderRadius: '5px' }}>
      <Box sx={{ alignItems: 'center', flexDirection: 'column', display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '100%' }}>
          <Avatar sx={{ mr: 1 }} src='/assets/images/favicon.png' variant='rounded' />          
          <Typography className='animation-1' variant='h4' sx={{ pt: 1, fontWeight: 'bold' }}>Vehicle Bidder</Typography>
        </Box>
        <Typography sx={{ mt: 2, mb: 1 }}>Email: {email || 'Yourname@email.com'}</Typography>
        <Box sx={{ position: 'relative', p: 3, width: '80%', textAlign: 'center', backgroundColor: 'rgb(245, 245, 245)', borderRadius: '5px' }}>
          <TextField name='email' sx={{ width: '60%', mb: 1, '& input': { pt: 1.5, pb: 1.5 }, '& label': { mt: -0.5 } }} onChange={(e) => { handleChange(e, setVerifyNumber) }} />
          <Typography>Input verify 6 number <br /> Check your email inbox.</Typography>          
          <Avatar src='/assets/images/verify-icon.png' variant='rounded' sx={{ position: 'absolute', right: '20px', bottom: '20px', width: '56px', height: '56px' }} />
        </Box>
          <Button className='button-85' variant='contained' disableElevation sx={{ width: '60%', mt: 2, pt: 1, pb: 1 }} onClick={handleVerify} >Verify</Button>
      </Box>
    </Container>
  )
}

export default Verification