import React from 'react';
import PropTypes from 'prop-types';

const News = ({ news: { title, content, image } }) => {
    return (
        <div className="news">
			<img src={ image } alt={ title } />
			<h3>{ title }</h3>
			<p>{ content }</p>
		</div>
    );
};

News.propTypes = {

}

export default News;

