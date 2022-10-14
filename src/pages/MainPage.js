import { useState } from 'react';
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
    const [title, setTitle] = useState('');
    const [font, setFont] = useState('');
    const [size, setSize] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [footer, setFooter] = useState('');

    const getTitleInput = (e) => {
        setTitle(e);
    }

    const getTitleFont = (e) => {
        setFont(e);
    }

    const getTitleSize = (e) => {
        setSize(e);
    }

    const getSubtitleInput = (e) => {
        setSubtitle(e);
    }

    const getPerformance = (e) => {
        setPages(pages.map((page, i) => i === currentPage ? [...page, e] : [...page]));
    }

    const getFooterInput = (e) => {
        setFooter(e);
    }

    const createNewPage = (e) => {
        setCurrentPage(old => old + 1);
        // setPages(pages.map((page, i) => i === currentPage ? [...page, e] : [...page]));
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
                            getTitleInput={getTitleInput} 
                            getTitleFont={getTitleFont}
                            getTitleSize={getTitleSize}
                            getSubtitleInput={getSubtitleInput}
                            getPerformance={getPerformance}
                            getFooterInput={getFooterInput}
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
                                    title={title} 
                                    font={font}
                                    size={size}
                                    subtitle={subtitle}
                                    perfs={page}
                                    footer={footer}
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