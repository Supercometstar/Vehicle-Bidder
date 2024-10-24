import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'

import { Grid2 as Grid, Box, Paper, Button, Typography, Fab, Divider, Avatar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import Header from 'app/components/Header'
import UrlBox from 'app/components/UrlBox'
import UrlHeader from 'app/components/UrlHeader'

import UrlInputModal from 'app/components/UrlInputModal'
import LogViewerModal from 'app/components/LogViewerModal'

import { getUrlInfos, addUrlInfo, editUrlInfo, removeUrlInfo } from 'app/store/actions/bid.action'

const AddButton = ({ handleAddUrlInfo }) => {
	return (
		<Button sx={{ m: 1 }} variant='contained' onClick={handleAddUrlInfo}>+Add URL Info</Button>
	)
}

const Bot = () => {

	const dispatch = useDispatch()

	const [ urlInputModalOpen, setUrlInputModalOpen ] = useState(false)
	const [ logViewerModalOpen, setLogViewerModalOpen ] = useState(false)

	const boxRef = useRef('box')
	const urlInfos = useSelector(store => store.bid.urlInfos)

	const handleDelete = async (item) => {
		dispatch(removeUrlInfo(item))
	}

	useEffect(() => {
		boxRef.current.scrollTo(0, 10000)
	}, [ urlInfos ])

	useEffect(() => {
		dispatch(getUrlInfos())
	}, [ dispatch ])

	return (
		<>
			<Header handleOpenViewer={() => { setLogViewerModalOpen(true) }} />
			<Box sx={{ justifyContent: 'center', bgcolor: 'rgb(245, 245, 245)', height: 'calc(100vh - 56px)', display: 'flow' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
					<Typography variant='h5' sx={{ pl: '5%', mt: 1, textAlign: 'left', width: '100%', boxSizing: 'border-box', fontWeight: 'bold' }}>Vehicle Info List</Typography>
				</Box>
				<Box sx={{ mt: 3, minWidth: '1200px', justifyContent: 'center', display: 'flex' }}>
					<Paper variant='elevation' elevation={0} sx={{ padding: 2, overflow: 'auto', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 350px)', overflow: 'auto', width: '90%' }} ref={boxRef}>
						<UrlHeader />
						{
							urlInfos.map((item, idx) => (
								<>
									<UrlBox urlInfo={item} onDelete={handleDelete} key={idx} />
									<Divider />
								</>
							))
						}
					</Paper>
				</Box>
			</Box>
			<Fab className='button-86' sx={{ position: 'absolute', right: '50px', bottom: '50px' }} onClick={() => {setUrlInputModalOpen(true)}}>
		        <AddIcon />
		    </Fab>
		    <UrlInputModal open={urlInputModalOpen} handleClose={() => { setUrlInputModalOpen(false) }} />
		    <LogViewerModal open={logViewerModalOpen} handleClose={() => { setLogViewerModalOpen(false) }} />
			{/*<Box sx={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', backgroundImage: 'url(/assets/images/background.jpg)', zIndex: -1000, opacity: .5, backgroundSize: '100% 100%' }} />*/}
		</>
	)
}

export default Bot