import React, { useState, useEffect, useContext } from 'react';
import shortid from 'shortid';
import { TokenContext } from './Context';
import { fetchDataInfo } from './Authorize';

const getNews = async (url, token) => {
	const newsInfo = await fetchDataInfo(url, 'GET', token);
	const newsIds = newsInfo.reduce((acc, news) => {
		return [...acc, {
			id: shortid.generate(),
			...news
		}]
	}, []);
	return newsIds;
};

const News = () => {
	const [news, setNews] = useState([]);
	const token = useContext(TokenContext);

	useEffect(() => {
		(async function() {
			const news = await getNews('http://localhost:7070/private/news', token);
			const newsIds = news.reduce((acc, elem) => {
				return [...acc, {
					id: shortid.generate(),
					...elem
				}]
			}, []);
			setNews(newsIds);
		}())
	}, [token]);

	const newsIds = news.map(({ id, image, title, content }) => (
		<div className="news" key={ id }>
			<img src={ image } alt={ title } />
			<h3>{ title }</h3>
			<p>{ content }</p>
		</div>
	));

	return newsIds;
};

export default News;

