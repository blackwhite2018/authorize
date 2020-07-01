import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { fetchDataToken, fetchDataInfo } from './Authorize';
import LogIn from './LogIn';
import News from './News';

const App = () => {
	const [dataAuth, setDataAuth] = useState({
		login: '',
		password: ''
	});
	const [userInfo, setUserInfo] = useState(null);
	const [news, setNews] = useState(null);
	
	const { login, password } = dataAuth;

	const handleChange = ({ target: { name, value } }) => {
		setDataAuth(prevValue => {
			return {
				...prevValue,
				[name]: value
			};
		});
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		const fetchData = async () => {
			const url = 'http://localhost:7070/auth';

			const { token } = await fetchDataToken(url, {
				method: 'POST',
				body: JSON.stringify({login: 'vasya', password: 'password'})
			});

			const userInfo = await fetchDataInfo('http://localhost:7070/private/me', 'GET', token);
			const news = await fetchDataInfo('http://localhost:7070/private/news', 'GET', token);

			setUserInfo(userInfo);
			setNews(news);

			localStorage.setItem('userInfo', JSON.stringify({
				token: token,
				userInfo: userInfo
			}));
		};

		fetchData();
	};

	useEffect(() => {
		let user = localStorage.getItem('userInfo');

		if (user !== null) {
			user = JSON.parse(user);

			const getNews = async () => {
				const newsInfo = await fetchDataInfo('http://localhost:7070/private/news', 'GET', user.token);
				const newsIds = newsInfo.reduce((acc, news) => {
					return [...acc, {
						id: shortid.generate(),
						...news
					}]
				}, []);
				setNews(newsIds);
			};

			getNews();
		}
	}, [userInfo]);
	
	return (
		<>
			{
				userInfo !== null ? null : <LogIn login={ login } password={ password } handleSubmit={ handleSubmit } handleChange={ handleChange } />
			}
			{
				news === null ? null : (<ul>
					{
						news.map(newInfo => {
							return <News key={ newInfo.id } news={ newInfo } />;
						})
					}
				</ul>)
			}
		</>
	);
};

export default App;
