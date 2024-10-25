import { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'

import { Box, Dialog, DialogTitle, DialogActions, DialogContent, Typography, TextField, Button,  } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SyncIcon from '@mui/icons-material/Sync'
import CircleIcon from '@mui/icons-material/Circle'
import CloseIcon from '@mui/icons-material/Close'

import { SelectBoxContext } from 'app/contexts/SelectBox.context'

import { getUrlInfo, addUrlInfo } from 'app/store/actions/bid.action'
import { show } from 'app/store/reducers/notification.reducer'

const LogViewerModal = ({ open, handleClose }) => {

	const dispatch = useDispatch()

	const [ url, setUrl ] = useState('')
	const [ price, setPrice ] = useState(0)
	const { selectedBox, setSelectedBox } = useContext(SelectBoxContext)

	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogContent sx={{ pb: 1, '& svg': { mr: 2, transform: 'scale(0.7)' } }}>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
					{
						selectedBox.log==='open'?<SyncIcon sx={{ animation: 'rotate-animation 1s linear infinite' }} />
						:[undefined].includes(selectedBox.log)?<CircleIcon />
						:<CheckCircleIcon color='success' />
					}
					<Typography>Opening Browser...</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
					{
						selectedBox.log==='login'?<SyncIcon sx={{ animation: 'rotate-animation 1s linear infinite' }} />
						:[undefined, 'open'].includes(selectedBox.log)?<CircleIcon />
						:<CheckCircleIcon color='success' />
					}
					<Typography>Login...</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
					{
						selectedBox.log==='checkVehicle'?<SyncIcon sx={{ animation: 'rotate-animation 1s linear infinite' }} />
						:[undefined, 'open', 'login'].includes(selectedBox.log)?<CircleIcon />
						:['invalidUrl', 'amountError'].includes(selectedBox.log)?<CloseIcon sx={{ color: 'red' }} />
						:<CheckCircleIcon color='success' />
					}
					<Typography>Checking vehicle...</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
					{
						selectedBox.log==='finding'?<SyncIcon sx={{ animation: 'rotate-animation 1s linear infinite' }} />
						:[undefined, 'open', 'login', 'checkVehicle', 'invalidUrl', 'amountError'].includes(selectedBox.log)?<CircleIcon />
						:<CheckCircleIcon color='success' />
					}
					<Typography>Finding bid button...</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
					{
						[undefined, 'open', 'login', 'checkVehicle', 'invalidUrl', 'amountError', 'finding'].includes(selectedBox.log)?<CircleIcon />
						:<CheckCircleIcon color='success' />
					}
					<Typography>
						{
							selectedBox.state==='failed'?'Failed'
							:'Success'
						}
					</Typography>
				</Box>

			</DialogContent>
		</Dialog>
	)
}

export default LogViewerModal