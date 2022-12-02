import { createLink } from "./utils/CreateLink";

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_TITLEFONT':
            return { ...state, titleFont: action.payload };
        case 'SET_FONTLINK':
            return { ...state, fontLink: createLink(action.payload) };
        case 'SET_TITLESIZE':
            return { ...state, titleSize: action.payload };
        case 'SET_SUBTITLE':
            return { ...state, subtitle: action.payload };
        case 'SET_FOOTER':
            return { ...state, footer: action.payload };
        case 'ADD_PAGE':
            return { ...state, program: [...state.program, []], page: state.page + 1 };
        default:
            return state;
    }
};

export default Reducer;
