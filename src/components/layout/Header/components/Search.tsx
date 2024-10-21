import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Box, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from '@/api/api.caller';

const Search = ({ open, onClose }: any) => {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();
	const { data: books } = useGetBooksQuery(
		{ title: searchTerm },
		{ skip: searchTerm.length === 0 }
	);

	const handleSearchChange = (event: any) => {
		setSearchTerm(event.target.value);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (searchTerm.trim() && books) {
			navigate('/filter-books-search', { state: { books: books.data.elements } });
			onClose();
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						padding: '6px 12px',
						backgroundColor: '#fafafa',
						borderRadius: '8px'
					}}
				>
					<IconButton onClick={onClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<InputBase
						placeholder="Bạn muốn tìm kiếm..."
						autoFocus
						value={searchTerm}
						onChange={handleSearchChange}
						inputProps={{ 'aria-label': 'search' }}
						sx={{ flex: 1 }}
					/>
					<IconButton type="submit" aria-label="search">
						<SearchIcon />
					</IconButton>
				</Box>
			</form>
			<Divider />
		</Dialog>
	);
};

export default Search;
