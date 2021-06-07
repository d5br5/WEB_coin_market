const defaultUrl = 'https://snu-coin.herokuapp.com';
const LOGIN_KEY = 'LOGIN_KEY';

const getDefaultHeaders = () => {
    const defaultHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (localStorage.getItem(LOGIN_KEY)) {
        defaultHeaders['Authorization'] = `Key ${localStorage.getItem(LOGIN_KEY)}`;
    }
    return defaultHeaders;
}

const post = async (url, body = {}, extraHeaders = {}) => {
    const res = await fetch(`${defaultUrl}/${url}`, {
        method: 'POST',
        body: new URLSearchParams(body).toString(),
        headers: {...getDefaultHeaders(), ...extraHeaders}
    });

    return await res.json();
}

const get = async (url, query = {}, extraHeaders = {}) => {
    const res = await fetch(`${defaultUrl}/${url}`, {
        method: 'GET',
        headers: {...getDefaultHeaders(), ...extraHeaders}
    });

    return await res.json();
}

const login = async (name, password) => {
    return await post('login', {name, password});
}

const loginByKey = async (key) =>{
    return await post('login_by_key', {key});
}

const loadMarkets = async () => {
    return await get('markets');
}

const loadMarket = async (market) => {
    return await get(`markets/${market}`);
}

const loadAssets = async () => {
    return await get('assets');
}

export {
    login,
    loginByKey,
    loadMarkets,
    loadMarket,
    loadAssets
}
