const fetchDataToken = async (url, opt) => {
    const response = await fetch(url, opt);
    const token = await response.json();
    return token;
};

const fetchDataInfo = async (url, method, token) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Authorization': `Bearer ${ token }`
        }
    });
    const data = await response.json();
    return data;
};

export { fetchDataToken, fetchDataInfo };