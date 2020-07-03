import React, { useState} from 'react';

const LogIn = ({ getDataAuthorize }) => {
	const [{ login, password }, setDataAuth] = useState({
		login: '',
		password: ''
	});

	const handleChange = ({ target: { name, value } }) => {
		setDataAuth(prev => {
			return {
				...prev,
				[name]: value
			};
		})
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		getDataAuthorize({ login, password });
	};

    return (
        <form name="form" onSubmit={ handleSubmit }>
			<input type="text" name="login" value={ login } onChange={ handleChange } />
			<input type="password" name="password" autoComplete="on" value={ password } onChange={ handleChange } />
			<input type="submit" value="sign in" />
		</form>
    );
};

export default LogIn;

