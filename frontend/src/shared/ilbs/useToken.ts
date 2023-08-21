interface UseTokenResult {
    saveToken: (token: string) => void;
    getToken: () => string | null;
    removeToken: () => void;
}

export const activateToken = (): UseTokenResult => {
    const saveToken = (token: string) => localStorage.setItem('access', token);
    const removeToken = () => localStorage.removeItem('access');
    const getToken = () => localStorage.getItem('access');

    return {
        saveToken,
        getToken,
        removeToken
    }
};