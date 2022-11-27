import { useRef, useEffect } from 'react';
import ProgramHeader from './ProgramHeader';
import Performance from './Performance';
import Footer from './Footer';
import styles from '../styles/Program.module.css';

export default function Program(props) {
    const ref = useRef();

    const checkOverflow = (el) => {
        return (el.offsetHeight < el.scrollHeight);
    }

    useEffect(() => {
        if (checkOverflow(ref.current)) {
            let e = props.perfs.splice(-1);
            props.createNewPage(e);
        }
    }, [props]);

    return (
        <div 
            ref={ref} 
            className={`${styles.program_page} ${props.page === props.showPage ? styles.active : styles.inactive}`}
        >
            {
                props.page === 0 && 
                <ProgramHeader 
                    title={props.title} 
                    font={props.font}
                    size={props.size}
                    subtitle={props.subtitle}
                />
            }
            <div className={styles.performances}>
                {props.perfs.length > 0 && props.perfs.map((perf, i) => <Performance key={i} perf={perf} />)}
            </div>
            {
                // footer should only be on last page
                props.footer && <Footer footer={props.footer} />
            }
        </div>
    );
}