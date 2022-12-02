import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../components/Header";
import Inputs from '../components/Inputs';
import Program from '../components/Program';
import styles from '../styles/MainPage.module.css';

export default function MainPage() {
    const [pages, setPages] = useState([[], [], [], []]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showPage, setShowPage] = useState(0);

    const getPerformance = (e) => {
        setPages(pages.map((page, i) => i === currentPage ? [...page, e] : [...page]));
    }

    const createNewPage = (e) => {
        let newPage = currentPage + 1;
        setCurrentPage(newPage);

        let program = [...pages].map((page, i) => i === currentPage ? [...page, e] : [...page]);
        setPages(program);
    }

    const togglePage = (e) => {
        if (e.localName === "li") {
            setShowPage(parseInt(e.id));
        } else {
            setShowPage(parseInt(e.parentNode.id));
        }
    }

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col lg={5}>
                        <Inputs 
                            getPerformance={getPerformance}
                        />
                    </Col>
                    <Col lg={7}>
                        <ul className={styles.program_nav}>
                            {
                                pages.map((page, i) =>
                                    <li 
                                        key={i}
                                        id={i}
                                        className={`${i <= currentPage ? null : styles.inactive} ${i === showPage ? styles.active : null}`}
                                        onClick={(e) => togglePage(e.target)}
                                    >
                                        <p>Page {i+1}</p>
                                    </li>
                                )
                            }
                        </ul>
                        {
                            pages.map((page, i) => 
                                <Program 
                                    key={i}
                                    page={i}
                                    showPage={showPage}
                                    perfs={page}
                                    createNewPage={createNewPage}
                                />
                            )
                        }
                        
                    </Col>
                </Row>
            </Container>
        </>
    );
}