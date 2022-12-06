import { useContext, useLayoutEffect, useRef } from "react";
import { Context } from '../Store';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Subtitle.module.css';

export default function Subtitle(props) {
    const [state, dispatch] = useContext(Context);
    const ref = useRef();

    useLayoutEffect(() => {
        let height = ref.current.clientHeight;
        if (height !== state.subtitleHeight) dispatch({ type: 'SET_SUBTITLEHEIGHT', payload: height });
    }, [state, dispatch, props.subtitle]);

    return (
        <div ref={ref} className={styles.subtitle}>
            <ReactMarkdown children={props.subtitle} />
        </div>
    );
}