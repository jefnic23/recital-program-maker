import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer';
import { createLink } from './utils/CreateLink';

const initialState = {
    title: '',
    titleFont: 'Concert One',
    fontLink: createLink('Concert One'),
    titleSize: '55',
    subtitle: '',
    footer: '',
    pages: 1,
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext();
export default Store;
