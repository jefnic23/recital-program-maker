import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../components/Header";
import Inputs from '../components/Inputs';
import Program from '../components/Program';
import styles from '../styles/MainPage.module.css';
import { Context } from '../Store';

export default function MainPage() {
    const [state, dispatch] = useContext(Context);
    const [showPage, setShowPage] = useState(0);

    const togglePage = (e) => {
        if (e.localName === "li") {
            setShowPage(parseInt(e.id));
        } else {
            setShowPage(parseInt(e.parentNode.id));
        }
    }

    /*
     * Get height of all components
     * Instead of checking for overflow,
     * check if new performance will exceed
     * page height.
     */

    // useEffect(() => {
    //     if (state.overflow === true) {
            
    //         let e = pages[currentPage].splice(-1);

    //         let newPage = currentPage + 1;
    //         setCurrentPage(newPage);

    //         let program = [...pages].map((page, i) => i === newPage ? [...page, e] : [...page]);
    //         setPages(program);
    //     };
    // }, [state.overflow, pages, currentPage])

    return (
        <>
            {/* Header should just be Navbar */}
            <Header />
            <Container>
                <Row>
                    <Col lg={5}>
                        <Inputs />
                    </Col>
                    <Col lg={7}>
                        {/* make header component? */}
                        <ul className={styles.program_nav}>
                            {
                                state.program.map((_, i) =>
                                    <li 
                                        key={i}
                                        id={i}
                                        className={`${i <= state.page ? null : styles.inactive} ${i === showPage ? styles.active : null}`}
                                        onClick={(e) => togglePage(e.target)}
                                    >
                                        <p>Page {i+1}</p>
                                    </li>
                                )
                            }
                        </ul>
                        {
                            state.program.map((page, i) => 
                                <Program 
                                    key={i}
                                    page={i}
                                    showPage={showPage}
                                    perfs={page}
                                />
                            )
                        }
                        
                    </Col>
                </Row>
            </Container>
        </>
    );
}