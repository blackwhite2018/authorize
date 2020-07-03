const fetchDataToken = async (url, opt) => {
    try {
        const response = await fetch(url, opt);

        if (response.ok) {
            const token = await response.json();
            return token;
        } else {
            throw new Error('400 bad request')
        }
    } catch (e) {
        console.error(e);
    }
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