import ReactMarkdown from 'react-markdown';
import styles from '../styles/Footer.module.css';

export default function Footer(props) {
    return (
        <div className={styles.footer}>
            <ReactMarkdown children={props.footer} />
        </div>
    );
}