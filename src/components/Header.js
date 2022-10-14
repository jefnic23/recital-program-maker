import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logo from '../logo.png';
import upload from '../icons/upload-solid.png';
import preview from '../icons/search-solid.png';
import print from '../icons/print-solid.png';
import help from '../icons/help-solid.png';
import contact from '../icons/email-solid.png';
import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <Navbar expand='lg' bg='dark' variant='dark'>
            <Container>
                <Navbar.Toggle aria-controls='collapse' />
                <Navbar.Collapse>
                    <Nav className='ms-auto' as='ul'>
                        <Nav.Item className="hvr-grow" as='li'>
                            {/* create Upload component */}
                            <div id="upload">
                                <label htmlFor='uploadButton' className="icon_container">
                                    <img className="icon" src={upload} alt="Upload.jpg" />
                                    <span>Upload</span>
                                </label>
                                <input id='uploadButton' type='file' accept=".csv, .tsv" />
                            </div>
                        </Nav.Item>
                        <Nav.Item className="hvr-grow" as='li'>
                            <div id="preview" className="icon_container">
                                <img className="icon" src={preview} alt="Preview.jpg"  />
                                <span>Preview</span>
                            </div>
                        </Nav.Item>
                        <Nav.Item className="hvr-grow" as='li'>
                            <div id="print" className="icon_container">
                                <img className="icon" src={print} alt="Print.jpg"  />
                                <span>Print</span>
                            </div>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand className={`${styles.brand_expand} mx-auto`}>
                    <img className={styles.logo} src={logo} alt="Recital Program Maker"></img>
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto" as='ul'>
                        <Nav.Item className="hvr-grow" as='li'>
                            <div id="help" className="icon_container">
                                <a href="https://github.com/jefnic23/recital-program-maker#how-to" target="_blank" rel="noreferrer">
                                    <img className="icon" src={help} alt="Help.jpg" />
                                </a>
                                <span>Help</span>
                            </div>
                        </Nav.Item>
                        <Nav.Item className="hvr-grow" as='li'>
                            <div id="contact" className="icon_container">
                                <a href="mailto:jefnic23@gmail.com" target="_blank" rel="noreferrer">
                                    <img className="icon" src={contact} alt="Email.jpg" />
                                </a>
                                <span>Contact</span>
                            </div>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
