export const SERVER_API = 'http://172.17.0.1:8080/api';
const AUTH_LOCAL_KEY = 'auth';

// untuk service autentikasi di provider router
export const isAuthenticated = () => {
    return localStorage.getItem(AUTH_LOCAL_KEY) ? true : false;
}

// set local storage simpan session
export const setLocalAuth = (username: string) => {
    localStorage.setItem(AUTH_LOCAL_KEY, username);
}

export const getAuth = () => {
    return (isAuthenticated) ? localStorage.getItem(AUTH_LOCAL_KEY) : null;
}

export const destroyAuth = () => {
    localStorage.removeItem(AUTH_LOCAL_KEY)
}