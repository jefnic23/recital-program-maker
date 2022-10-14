import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FontOptions from './FontOptions';

const fontSizes = [];
for (let i = 12; i < 73; i++) {
    fontSizes.push(<option value={i} key={i}>{i}</option>)
}

const createLink = (font) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css?family=${font.split(' ').join('+')}`;
    return link;
}

export default function Inputs(props) {
    const [title, setTitle] = useState('');
    const [font, setFont] = useState('Concert One');
    const [size, setSize] = useState('55');
    const [link, setLink] = useState(createLink(font));
    const [subtitle, setSubtitle] = useState('');
    const [pieces, setPieces] = useState('Untitled');
    const [composers, setComposers] = useState('Anon.');
    const [performers, setPerformers] = useState('John/Jane Doe');
    const [footer, setFooter] = useState('');
    
    useEffect(() => {
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, [link])

    const sendTitleInput = (e) => {
        setTitle(e);
        props.getTitleInput(e);
    }

    const sendTitleFont = (e) => {
        setFont(e);
        setLink(createLink(e));
        props.getTitleFont(e);
    }

    const sendTitleSize = (e) => {
        setSize(e);
        props.getTitleSize(e);
    }

    const sendSubtitleInput = (e) => {
        setSubtitle(e);
        props.getSubtitleInput(e);
    }

    const sendPerformance = (e) => {
        e.preventDefault();
        props.getPerformance({
            'pieces': Array.isArray(pieces) ? pieces : [pieces], 
            'composers': Array.isArray(composers) ? composers : [composers], 
            'performers': Array.isArray(performers) ? performers : [performers]
        });
        setPieces('Untitled');
        setComposers('Anon.');
        setPerformers('John/Jane Doe');
        e.target.reset();
    }

    const sendFooterInput = (e) => {
        setFooter(e);
        props.getFooterInput(e);
    }

    return (
        <Form onSubmit={sendPerformance}>
            <Form.Group className="mb-3" controlId="titleInput">
                <Form.Label>Program Title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="enter the title for your recital"
                    value={title}
                    onChange={(e) => sendTitleInput(e.target.value)}
                    autoFocus={true} 
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="titleFont">
                    <Form.Label>Font</Form.Label>
                    <Form.Select 
                        htmlSize={5} 
                        value={font}
                        onChange={(e) => sendTitleFont(e.target.value)}
                    >
                        <FontOptions />
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="titleSize">
                    <Form.Label>Size</Form.Label>
                    <Form.Select 
                        htmlSize={5} 
                        value={size}
                        onChange={(e) => sendTitleSize(e.target.value)}
                    >
                        {fontSizes}
                    </Form.Select>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId='subtitleInput'>
                <Form.Label>Subtitle</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder='enter subtitle(s), if any' 
                    value={subtitle}
                    onChange={(e) => sendSubtitleInput(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId='pieceInput'>
                <Form.Label>Piece Title</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="enter composition title(s)" 
                    onChange={(e) => setPieces(e.target.value.split(/\r?\n/))}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId='composerInput'> 
                <Form.Label>Composer</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="enter composer name(s)" 
                    onChange={(e) => setComposers(e.target.value.split(/\r?\n/))}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId='performersInput'>
                <Form.Label>Performers</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="enter performers/accompanist name(s)" 
                    onChange={(e) => setPerformers(e.target.value.split(/\r?\n/))}
                />
            </Form.Group>

            <Button className='mb-3' variant='primary' type='submit'>
                Enter performance info
            </Button>

            <Form.Group className='mb-3' controlId='togglePerformers'>
                <Form.Check type="switch" label='Place performers(s) on top' />
            </Form.Group>
            
            <Form.Group className='mb-3' controlId='footerInput'>
                <Form.Label>Footer</Form.Label>
                <Form.Control 
                    as="textarea"
                    placeholder="enter footer(s), if any" 
                    value={footer}
                    onChange={(e) => sendFooterInput(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
}