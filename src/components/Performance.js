import React from 'react';
import Piece from './Piece';
import styles from '../styles/Performance.module.css';

export default function Performance(props) {
    return (
        <div className={styles.performance_container}>
            <div className={styles.move_performance}></div>
            <div className={styles.performance}>
                {
                    props.perf.pieces.map((piece, i) => 
                        <Piece key={i} piece={piece} composer={props.perf.composers[i]} />
                    )
                }
                {
                    props.perf.performers.map((performer, i) =>
                        <p key={i} className={styles.performer}>
                            <i>{performer}</i>
                        </p>
                    )
                }
            </div>
            <div className={styles.edit_performance}></div>
        </div>
    );
}