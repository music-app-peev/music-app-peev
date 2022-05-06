
import { clearUserData, getUserData, setUserData } from '../util.js';


const hostname = 'https://parseapi.back4app.com';

async function request(url, options) {
    try {
        const response = await fetch(hostname + url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw {
                message: error.error,
                code: error.code
            };
        }

        return response.json();
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'OGHiQgP3L84TOkNhGXzUN3UsgEjviKPqjFzGJHxB',
            'X-Parse-REST-API-Key': '0EI8poihG2GpvqJ3zUe1cz2DBOat8E8N1xuXJm4y'
        }
    };

    const userData = getUserData();
    if (userData) {
        options.headers['X-Parse-Session-Token'] = userData.token;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(username, password) {
    const result = await post('/login', { username, password });

    const userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken
    };
    setUserData(userData);

    return result;
}

export async function register(username, password) {
    const result = await post('/users', { username, password });

    const userData = {
        id: result.objectId,
        token: result.sessionToken
    };

    setUserData(userData);

    return result;
}

export async function logout() {
    post('/logout');
    clearUserData();
}