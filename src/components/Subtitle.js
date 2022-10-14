import ReactMarkdown from 'react-markdown';
import styles from '../styles/Subtitle.module.css';

export default function Subtitle(props) {
    return (
        <div className={styles.subtitle}>
            <ReactMarkdown children={props.subtitle} />
        </div>
    );
}