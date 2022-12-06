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
        case 'SET_PAGE':
            return { ...state, program: state.program.map((page, i) => i === state.page ? [...page, action.payload] : [...page]) };
        case 'ADD_PAGE':
            return { ...state, program: [...state.program, []], page: state.page + 1 };
        case 'SET_TITLEHEIGHT':
            return { ...state, titleHeight: action.payload };
        case 'SET_SUBTITLEHEIGHT':
            return { ...state, subtitleHeight: action.payload };
        case 'SET_FOOTERHEIGHT':
            return { ...state, footerHeight: action.payload };
        case 'SET_PROGRAMHEIGHT':
            return { ...state, programHeight: state.programHeight + action.payload };
        default:
            return state;
    }
};

export default Reducer;
