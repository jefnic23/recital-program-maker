import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import styles from '../styles/Piece.module.css';

export default function Piece(props) {
    const [filler, setFiller] = useState(' . ');
    const [filled, setFilled] = useState(false);
    const [cname, setCname] = useState(styles.test);
    const [ref, { width }] = useMeasure({ scroll: false });

    useEffect(() => {
        if (!filled) {
            if (width < 450) {
                setFiller(e => e + ' . ');
            } else {
                setFiller(e => e.slice(0, -3));
                setFilled(!filled);
                setCname(styles.piece);
            }
        }
    }, [width, filled])

    return (
        <p ref={ref} className={cname}>
            <b>{props.piece}</b>
            {filler}
            {props.composer}
        </p>
    );
}