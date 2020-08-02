// import actions from './actions'

let initialState = {
    email: "",
    token: "",
    isLoggedIn: false,
}

let reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE': {
            return {
                ...state,
                email: action.email,
                token: action.token,
                isLoggedIn: true
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                email: '',
                token: '',
                isLoggedIn: false
            }
        }
        default: return state;
    }
}

export default reducer;
