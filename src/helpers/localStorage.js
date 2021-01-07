export const getAccessToken = () => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')).access : null;
export const getRefreshToken = () => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')).refresh : null;

export function setTokensToLocalStorage(tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
}

export function removeTokens() {
    localStorage.removeItem('tokens');
}

export function refreshLocalStorage(access) {
    const oldTokens = JSON.parse(localStorage.getItem('tokens'));
    setTokensToLocalStorage({ ...oldTokens, access });
}



export function getAccessAuthHeader() {
    return {
        Authorization: 'Bearer ' + getAccessToken()
    }
}

