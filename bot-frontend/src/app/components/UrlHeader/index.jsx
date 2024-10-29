import { Box, Grid2 as Grid, Typography } from '@mui/material'

const UrlHeader = () => {
	return (
		<Box sx={{ margin: 1 }}>
			<Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', color: 'gray' }} columns={18}>
				<Grid item size={1}>
					<Typography variant='subtitle2'></Typography>
				</Grid>
				<Grid item size={13}>
					<Typography variant='subtitle2' sx={{ textAlign: 'left', pl: 1 }}>URL</Typography>
				</Grid>
				<Grid item size={2}>
					<Typography variant='subtitle2'>PRICE</Typography>
				</Grid>
				<Grid item size={1}>
					<Typography variant='subtitle2'>STATE</Typography>
				</Grid>
				<Grid item size={1}>
					<Typography variant='subtitle2'>DELETE</Typography>
				</Grid>
			</Grid>
		</Box>
	)
}

export default UrlHeader