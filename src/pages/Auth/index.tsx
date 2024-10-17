import React, { useState } from 'react';
import { Box } from '@mui/material';
import Register from './Register/screens/Register';
import Login from './Login/screens/Login';
import LOGIN_IMAGE from '@/assets/image/img-login.webp';
import { useStyles } from './Auth.style';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const Auth: React.FC = () => {
	const classes = useStyles();
	const [currentForm, setCurrentForm] = useState('login');

	const toggleForm = (formName: string) => {
		setCurrentForm(formName);
	};

	return (
		<Box className={classes.container}>
			<Box className={classes.imageContainer}>
				<img src={LOGIN_IMAGE} alt="Login Image" className={classes.loginImage} />
				{currentForm === 'login' && (
					<Login
						onToggleForm={() => toggleForm('register')}
						onForgotPassword={() => toggleForm('forgotPassword')}
					/>
				)}
				{currentForm === 'register' && <Register onToggleForm={() => toggleForm('login')} />}
				{currentForm === 'forgotPassword' && (
					<ForgotPassword onToggleForm={() => toggleForm('login')} />
				)}
			</Box>
		</Box>
	);
};

export default Auth;
