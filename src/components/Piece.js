import React from "react";
import { getTextWidth } from "../utils/GetTextWidth";
import styles from '../styles/Piece.module.css';

export default function Piece(props) {
    const initialWidth = getTextWidth(props.piece, true) + getTextWidth(props.composer);
    const fillerWidth = getTextWidth('.');
    const fillerRepeat = Math.floor((450 - initialWidth) / fillerWidth);

    return (
        <p className={styles.piece}>
            <b>{props.piece}</b>
            {'.'.repeat(fillerRepeat)}
            {props.composer}
        </p>
    );
}
