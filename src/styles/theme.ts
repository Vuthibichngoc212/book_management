// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#223671'
		},
		secondary: {
			main: '#f26526'
		},
		error: {
			main: '#f44336'
		},
		warning: {
			main: '#ff9800'
		},
		info: {
			main: '#2196f3'
		},
		success: {
			main: '#4caf50'
		},
		background: {
			default: '#f4f6f8',
			paper: '#ffffff'
		},
		text: {
			primary: 'rgba(0,0,0,.87)',
			// primary: '#000',
			secondary: 'rgba(0,0,0,.5)'
		}
	},
	typography: {
		fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
		h1: {
			fontSize: '2rem',
			fontWeight: 600
		},
		h2: {
			fontSize: '1.75rem',
			fontWeight: 600
		},
		h3: {
			fontSize: '1.5rem',
			fontWeight: 500
		},
		h4: {
			fontSize: '1.25rem',
			fontWeight: 500
		},
		h5: {
			fontSize: '1rem',
			fontWeight: 400
		},
		h6: {
			fontSize: '0.875rem',
			fontWeight: 400
		},
		body1: {
			fontSize: '1rem'
		},
		body2: {
			fontSize: '0.875rem'
		},
		button: {
			fontSize: '0.875rem',
			textTransform: 'uppercase'
		}
	},
	shape: {
		borderRadius: 8
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					padding: '16px'
				}
			}
		}
	}
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#223671'
		},
		secondary: {
			main: '#f26526'
		},
		error: {
			main: '#f44336'
		},
		warning: {
			main: '#ff9800'
		},
		info: {
			main: '#2196f3'
		},
		success: {
			main: '#4caf50'
		},
		background: {
			default: '#121212',
			paper: '#1d1d1d'
		},
		text: {
			primary: '#ffffff',
			secondary: 'rgba(255,255,255,.7)'
		}
	},
	typography: {
		fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
		h1: {
			fontSize: '2rem',
			fontWeight: 600
		},
		h2: {
			fontSize: '1.75rem',
			fontWeight: 600
		},
		h3: {
			fontSize: '1.5rem',
			fontWeight: 500
		},
		h4: {
			fontSize: '1.25rem',
			fontWeight: 500
		},
		h5: {
			fontSize: '1rem',
			fontWeight: 400
		},
		h6: {
			fontSize: '0.875rem',
			fontWeight: 400
		},
		body1: {
			fontSize: '1rem'
		},
		body2: {
			fontSize: '0.875rem'
		},
		button: {
			fontSize: '0.875rem',
			textTransform: 'uppercase'
		}
	},
	shape: {
		borderRadius: 8
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					padding: '16px'
				}
			}
		}
	}
});

export { darkTheme };

export default theme;
