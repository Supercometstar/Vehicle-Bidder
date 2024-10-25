import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Box, Dialog, DialogTitle, DialogActions, DialogContent, Typography, TextField, Button,  } from '@mui/material'

import { addUrlInfo } from 'app/store/actions/bid.action'
import { show } from 'app/store/reducers/notification.reducer'

const UrlInputModal = ({ open, handleClose }) => {

	const dispatch = useDispatch()

	const [ url, setUrl ] = useState('')
	const [ price, setPrice ] = useState(0)

	const handleAddUrlInfo = () => {
		if (price % 25 !== 0) {
			dispatch(show({ message: 'Amount must be times of 25.', state: false }))
		}else {
			dispatch(addUrlInfo({ url, amount: price, state: 'stop' }))
			handleClose()
		}
	}

	const handleChange = (e, func) => {
		func(e.target.value)
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle id="alert-dialog-title" sx={{ transform: 'translateX(0)' }}>
	          	Add New Info
	        </DialogTitle>
			<DialogContent sx={{ pb: 1 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
					<Typography sx={{ minWidth: '80px', textAlign: 'right', mr: 2 }}>URL: </Typography>
					<TextField sx={{ '& input': { p: 1 }, width: '700px' }} onChange={(e) => handleChange(e, setUrl)} />
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography sx={{ minWidth: '80px', textAlign: 'right', mr: 2 }}>PRICE: </Typography>
					<TextField type='number' sx={{ '& input': { p: 1 }, width: '100px' }} onChange={(e) => handleChange(e, setPrice)} />
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleAddUrlInfo} sx={{ color: 'white', bgcolor: 'black' }}>Add</Button>
				<Button onClick={handleClose} sx={{ color: 'black' }}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UrlInputModal