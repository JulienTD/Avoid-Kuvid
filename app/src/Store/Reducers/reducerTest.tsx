const INITIAL_STATE = {
    status: false
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'TEST':
            return { ...state, status: action.payload };
        default:
            return state;
    }
};