import React from "react";
import { getTextWidth } from "../utils/GetTextWidth";
import styles from '../styles/Piece.module.css';

export default function Piece(props) {
    const initialWidth = getTextWidth(<b>{props.piece}</b> + props.composer);
    const fillerWidth = getTextWidth(' . ');
    const fillerRepeat = (450 - initialWidth) / fillerWidth;

    return (
        <p className={styles.piece}>
            <b>{props.piece}</b>
            {' . '.repeat(fillerRepeat)}
            {props.composer}
        </p>
    );
}
