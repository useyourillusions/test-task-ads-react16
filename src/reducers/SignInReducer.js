const initialState = {
    isLoggedIn: false,
    personalInfo: {},
    isOnProcess: false,
    errorData: {
        hasError: false,
        errorCode: null,
        errorMessage: null
    },
};

const userData = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGN-IN_PROCESS': {
            return {
                ...state,
                isOnProcess: action.payload,
            }
        }
        case 'SIGN-IN_SUCCESS': {
            return {
                ...state,
                isLoggedIn: true,
                isOnProcess: false,
                personalInfo: action.payload
            }
        }
        case 'SIGN-IN_ERROR': {
            return {
                ...state,
                isOnProcess: false,
                errorData: action.payload
            }
        }
        case 'SIGN-IN_LOGOUT': {
            return {
                ...state,
                isLoggedIn: false,
                personalInfo: {}
            }
        }

        default: return state;
    }
};

export default userData;
