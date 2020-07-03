import React, { useState, useEffect } from 'react';
import { fetchDataToken, fetchDataInfo } from './Authorize';
import { TokenContext } from './Context';
import LogIn from './LogIn';
import LogOut from './LogOut';
import News from './News';

const App = () => {
	const [token, setToken] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [isLoadToken, setIsLoadInfo] = useState(false);
	const [dataAuth, setDataAuth] = useState(null);

	const setNewDataAuth = dataAuth => {
		setDataAuth(dataAuth);
	};

	const fetchData = async url => {
		try {
			const { token } = await fetchDataToken(url, {
				method: 'POST',
				body: JSON.stringify(dataAuth)
			});

			if (token.statusCode === 400) {
				console.log(1, 2)
			}

			const userInfo = await fetchDataInfo('http://localhost:7070/private/me', 'GET', token);

			setToken(token);
			setUserInfo(userInfo);
			setIsLoadInfo(prev => ({...prev, isLoadToken: true}));

			localStorage.setItem('userInfo', JSON.stringify({
				token: token,
				userInfo: userInfo
			}));

		} catch (e) {
			if (e instanceof SyntaxError) {
				console.error(e);
				return;
			}
		}
	};

	useEffect(() => {
		let userData = localStorage.getItem('userInfo');

		if (userData !== null) {
			const { token, userInfo } = JSON.parse(userData);

			setUserInfo(userInfo);
			setIsLoadInfo(prev => ({...prev, isLoadToken: true}));
			setToken(token);
		} else {
			if (dataAuth !== null) {
				fetchData('http://localhost:7070/auth');
			}
		}
	}, [token, dataAuth]);

	const handleProfileOut = () => {
		localStorage.removeItem('userInfo');
		setToken(null);
		setUserInfo(null);
		setIsLoadInfo(false);
		setDataAuth(null);

	};

	return (
		<div className="container">
			<TokenContext.Provider value={ token }>
				<div className="row">
					{ isLoadToken ? <LogOut info={ userInfo } handleProfileOut={ handleProfileOut } /> : <LogIn getDataAuthorize={ setNewDataAuth } /> }
				</div>
				<div className="row">
					{ isLoadToken && <News /> }
				</div>
			</TokenContext.Provider>
		</div>
	);
};

export default App;
