import Dialog from '@mui/material/Dialog';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Box, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ open, onClose }: any) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<Box
				sx={{
					flex: 1,
					marginBottom: '10px',
					color: '#000',
					backgroundColor: '#fafafa',
					padding: '6px 12px',
					borderRadius: '8px'
				}}
			>
				<IconButton onClick={onClose}>
					<SearchIcon />
				</IconButton>
				<InputBase
					placeholder="Bạn muốn tìm kiếm..."
					autoFocus
					inputProps={{ 'aria-label': 'search' }}
				/>
				<IconButton edge="start" onClick={onClose} aria-label="close">
					<CloseIcon />
				</IconButton>
			</Box>
			<Divider />
		</Dialog>
	);
};

export default Search;
