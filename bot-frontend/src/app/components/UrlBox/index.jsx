import { useContext } from 'react'

import { Box, Grid2 as Grid, Typography, Divider, Button, Chip, IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import SyncIcon from '@mui/icons-material/Sync'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { blue } from '@mui/material/colors'

import { SelectBoxContext } from 'app/contexts/SelectBox.context'

import { baseURL } from 'app/utils/constants.util'

const UrlBox = ({ urlInfo, onDelete }) => {

	const showLog = () => {
		window.open(`${baseURL}/${urlInfo.url.replace('/', '-')}---${urlInfo.amount}.log`, '_blank')
	}

	const { selectedBox, setSelectedBox } = useContext(SelectBoxContext)

	const handleSelectBox = () => {
		if (selectedBox.id === urlInfo.id) {
			setSelectedBox({})
		}else {
			setSelectedBox(urlInfo)
		}
	}

	return (
		<Box sx={{ m: 1, cursor: 'pointer' }} onClick={handleSelectBox}>
			<Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', color: 'rgb(180, 180, 180)' }} columns={17}>
				<Grid item size={1} sx={{ display: 'flex', justifyContent: 'center' }}>
					<CheckIcon sx={{ display: selectedBox.id===urlInfo.id?'block':'none', color: selectedBox.id===urlInfo.id?blue[500]:'' }} />
				</Grid>
				<Grid item size={12}>
					<Typography sx={{ padding: 1, textAlign: 'left', color: selectedBox.id===urlInfo.id?blue[500]:'' }}>{urlInfo.url}</Typography>
				</Grid>
				<Grid item size={2}>
					<Typography sx={{ padding: 1, color: selectedBox.id===urlInfo.id?blue[500]:'' }}>{urlInfo.amount}</Typography>
				</Grid>
				<Grid item size={1}>
					{
						urlInfo.state==='running'?<SyncIcon sx={{ animation: 'rotate-animation 1s linear infinite', color: selectedBox.id===urlInfo.id?blue[500]:'' }} />
						:urlInfo.state==='success'?<CheckIcon sx={{ color: selectedBox.id===urlInfo.id?blue[500]:'' }} />
						:urlInfo.state==='failed'?<PriorityHighIcon sx={{ color: selectedBox.id===urlInfo.id?blue[500]:'' }} />
						:<CloseIcon sx={{ color: selectedBox.id===urlInfo.id?blue[500]:'' }} />
					}
				</Grid>
				<Grid item size={1}>
					<IconButton aria-label="delete" size="middle" onClick={() => onDelete(urlInfo)} sx={{ color: selectedBox.id===urlInfo.id?blue[500]:'' }}>
					  	<DeleteIcon fontSize="inherit" />
					</IconButton>
				</Grid>
			</Grid>
		</Box>
	)
}

export default UrlBox