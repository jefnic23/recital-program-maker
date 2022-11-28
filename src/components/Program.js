import { useContext, useEffect, useRef } from 'react';
import { Context } from '../Store';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Performance from './Performance';
import Footer from './Footer';
import styles from '../styles/Program.module.css';

export default function Program(props) {
    const [state, dispatch] = useContext(Context);
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
                <div>
                    <Title title={state.title} font={state.titleFont} size={state.titleSize} />
                    <Subtitle subtitle={state.subtitle} />
                </div>
            }
            <hr className='style1' />
            <div className={styles.performances}>
                {props.perfs.length > 0 && props.perfs.map((perf, i) => <Performance key={i} perf={perf} />)}
            </div>
            {
                // footer should only be on last page
                state.footer && <Footer footer={state.footer} />
            }
        </div>
    );
}