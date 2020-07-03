import React from 'react';

const LogOut = ({ info: { name, avatar }, handleProfileOut }) => {

    const handleClick = evt => {
        handleProfileOut();
    };

    return (
        <div className="logout-progile">
            <p>{ name }</p>
            <img src={ avatar } alt={ `photo ${ name }` } />
            <input type="button" onClick={ handleClick } value="logout" />
        </div>
    );
}

export default LogOut;
