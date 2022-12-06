import { useContext, useLayoutEffect, useRef } from "react";
import { Context } from '../Store';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Footer.module.css';

export default function Footer(props) {
    const [state, dispatch] = useContext(Context);
    const ref = useRef();

    useLayoutEffect(() => {
        let height = ref.current.clientHeight;
        if (height !== state.footerHeight) dispatch({ type: 'SET_FOOTERHEIGHT', payload: height });
    }, [state, dispatch, props.footer]);

    return (
        <div className={styles.footer}>
            <ReactMarkdown children={props.footer} />
        </div>
    );
}