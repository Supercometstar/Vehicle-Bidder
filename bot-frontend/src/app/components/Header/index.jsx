import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Grid2 as Grid, Typography, IconButton, Chip, Avatar, Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import LogoutIcon from '@mui/icons-material/Logout'

import { SelectBoxContext } from 'app/contexts/SelectBox.context'

import { editUrlInfo } from 'app/store/actions/bid.action'

import { logoutUser } from 'app/store/actions/auth.action'
import { show } from 'app/store/reducers/notification.reducer'

const Header = ({ handleOpenViewer }) => {
	
	const email = useSelector(store => store.auth.email)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { selectedBox, setSelectedBox } = useContext(SelectBoxContext)

	const handleLogout = async () => {
		const result = await dispatch(logoutUser())
		if (result) {
			dispatch(show({ message: 'Logout!', state: true }))
	    	navigate('/sign-in')
		}
	}

	const handleChange = async () => {
		console.log(selectedBox)
		if (selectedBox.state === undefined) return
		if (selectedBox.state === 'running') {
			dispatch(editUrlInfo({ ...selectedBox, state: 'stop' }))
			setSelectedBox({ ...selectedBox, state: 'stop' })
		}else {
			dispatch(editUrlInfo({ ...selectedBox, state: 'running' }))
			setSelectedBox({ ...selectedBox, state: 'running' })
		}
	}

	return (
		<Grid container columns={12} sx={{ justifyContent: 'space-between', alignItems: 'center', pl: 2, pr: 2, pt: 1, pb: 1 }}>
			<Grid item size={6} sx={{ display: 'flex', alignItems: 'center' }}>
				<Avatar src='/assets/images/favicon.png' variant='rounded' />
				<Typography variant='h5' sx={{ pl: 3, mt: 1, textAlign: 'left', width: '100%', boxSizing: 'border-box' }}>Vehicle Automatic Bidder</Typography>
			</Grid>
			<Grid item size={6} sx={{ justifyContent: 'right', display: 'flex', alignItems: 'center' }}>
				<Button onClick={handleOpenViewer} sx={{ display: selectedBox.state===undefined?'none':'block', mr: 4, color: 'white', bgcolor: 'gray' }}>View Log</Button>
				<Button onClick={handleChange} sx={{ display: selectedBox.state===undefined?'none':'block', color: 'white', bgcolor: 'gray' }} >{selectedBox.state==='running'?'Stop':'Start'}</Button>
				<Avatar sx={{ bgcolor: blue[500], mr: 3, ml: 3 }}>{email[0].toUpperCase()}</Avatar>
				<IconButton aria-label="delete" size="middle" onClick={handleLogout}>
				  	<LogoutIcon fontSize="inherit" />
				</IconButton>
			</Grid>
		</Grid>
	)
}

export default Header