export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export function loginAction(activeUser) {
    return {
        type: LOGIN,
        payload: {
            activeUser
        }
    }
}

export function logoutAction() {
    return {
        type: LOGOUT
    }
}