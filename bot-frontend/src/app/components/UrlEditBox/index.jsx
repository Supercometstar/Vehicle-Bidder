import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Paper, Grid2 as Grid, TextField, Divider, Chip, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { show } from 'app/store/reducers/notification.reducer'

import { baseURL } from 'app/utils/constants.util'

const stateInfo = {
	stop: { label: 'Stopped', color: '' },
	success: { label: 'Successed', color: 'success' },
	error: { label: 'Error', color: 'error' },
	amountError: { label: 'Amount Error', color: 'warning' },
	invalidUrl: { label: 'URL is Incorrect', color: 'warning' },
}

const UrlEditBox = ({ urlInfo, onChange, onDelete }) => {

	const dispatch = useDispatch()

	const [ _urlInfo, setUrlInfo ] = useState({ ...urlInfo })
	// const _urlInfo = { ...urlInfo }

	const handleChange = (e, option) => {
		_urlInfo[option] = e.target.value
	}

	const _onChange = (info) => {
		if (_urlInfo.amount % 25 !== 0) {
			dispatch(show({ message: 'Amount must be times of 25.', state: false }))
			return
		}else {
			onChange(info)
		}
	}

	const showLog = () => {
		window.open(`${baseURL}/${urlInfo.url.replace('/', '-')}---${urlInfo.amount}.log`, '_blank')
	}

	return (
		<Paper sx={{ margin: 1 }} elevation={1}>
			<Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }} columns={23}>
				<Grid item size={12}>
					<TextField label='URL' defaultValue={urlInfo.url} sx={{ '& input': { padding: 1 }, width: '100%', '& label': { mt: -1 } }} onChange={(e) => handleChange(e, 'url')} />
				</Grid>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Grid item size={2}>
					<TextField label='Amount' defaultValue={urlInfo.amount} type='number' sx={{ '& input': { padding: 1 }, '& label': { mt: -1 } }} onChange={(e) => handleChange(e, 'amount')} />
				</Grid>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Grid item size={2}>
					<Chip label={stateInfo[urlInfo.state].label} color={stateInfo[urlInfo.state].color} variant='outlined' sx={{ width: '100%' }} />
				</Grid>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Grid item size={2}>
					<Button sx={{ width: '100%' }} onClick={() => _onChange({ ..._urlInfo, state: 'start' })}>Start</Button>
				</Grid>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Grid item size={2}>
					<Button variant='text' sx={{ width: '100%', color: 'gray' }} onClick={showLog}>View Log</Button>
				</Grid>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Grid item size={1}>
					<IconButton aria-label="delete" size="middle" onClick={() => onDelete(urlInfo)}>
					  	<DeleteIcon fontSize="inherit" />
					</IconButton>
				</Grid>
			</Grid>
			
			
		</Paper>
	)
}

export default UrlEditBox