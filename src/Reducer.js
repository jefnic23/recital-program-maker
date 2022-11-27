const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ASLEEP':
            return { ...state, asleep: action.payload };
        default:
            return state;
    }
};

export default Reducer;
