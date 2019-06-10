export const SERVER_API = 'http://192.168.1.10:8080/api';
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

export const convertToFinalCollection = (raws: Array<object>, gallery?: Array<any>) => {
    let result = new Array();

    if (!gallery) {
        raws.map((src: object) => {
            result.push({
                src: src
            });
        })
    } else {
        raws.map((src: object, index: number) => {
            result.push({
                idposting: gallery[index].idposting,
                src: src
            });
        })

    }

    return result;
}