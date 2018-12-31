const initialState = {
    isLoggedIn: false,
    personalInfo: {},
    isSignInOnProcess: false,
    isLogoutOnProcess: false
};

const userData = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGN-IN_PROCESS': {
            return {
                ...state,
                isSignInOnProcess: action.payload,
            }
        }
        case 'SIGN-IN_SUCCESS': {
            return {
                ...state,
                isLoggedIn: true,
                isSignInOnProcess: false,
                personalInfo: action.payload
            }
        }
        case 'LOGOUT_PROCESS': {
            return {
                ...state,
                isLogoutOnProcess: true,
            }
        }
        case 'LOGOUT_END': {
            return {
                ...state,
                isLoggedIn: false,
                isLogoutOnProcess: false,
                personalInfo: {}
            }
        }

        default: return state;
    }
};

export default userData;
