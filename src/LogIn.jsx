import React from 'react';
import PropTypes from 'prop-types';

const LogIn = ({ login, password, handleSubmit, handleChange }) => {
    return (
        <form name="form" onSubmit={ handleSubmit }>
			<input type="text" name="login" value={ login } onChange={ handleChange } />
			<input type="password" name="password" value={ password } onChange={ handleChange } />
			<input type="submit" value="sign in" />
		</form>
    );
};

LogIn.propTypes = {

};

export default LogIn;

