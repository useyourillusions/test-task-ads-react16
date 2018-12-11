const initialState = {
    isLoggedIn: false,
    personalInfo: {},
    isOnProcess: false,
    /*errorData: {
        hasError: false,
        errorCode: null,
        errorMessage: null
    },*/
};

const userData = (state = initialState, action) => {
    switch(action.type) {
        case 'AUTH_PROCESS': {
            return {
                ...state,
                isOnProcess: action.payload,
            }
        }
        case 'AUTH_SUCCESS': {
            return {
                ...state,
                isLoggedIn: true,
                isOnProcess: false,
                personalInfo: action.payload
            }
        }
        case 'AUTH_LOGOUT': {
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
