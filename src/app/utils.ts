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

export const convertCollectionToBase64PNG = (encoded: Array<object>) => {
    let result = new Array();

    encoded.map((enc: object) => {
        let base64 = "data:image/png;base64,";
        let final = base64 + enc;
        result.push({
            encode: final
        });
    })

    return result;
}

export const convertToBase64PNG = (raws: Array<object>, gallery: Array<any>) => {
    let result = new Array();

    raws.map((enc: object, index: number) => {
        let base64 = "data:image/png;base64,";
        let final = base64 + enc;
        result.push({
            idposting: gallery[index].idposting,
            encode: final
        });
    })

    return result;
}