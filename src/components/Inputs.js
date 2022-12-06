import { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FontOptions from './FontOptions';
import { Context } from '../Store';

const fontSizes = [];
for (let i = 12; i < 73; i++) {
    fontSizes.push(<option value={i} key={i}>{i}</option>)
}

export default function Inputs(props) {
    const [state, dispatch] = useContext(Context);
    const [pieces, setPieces] = useState('Untitled');
    const [composers, setComposers] = useState('Anon.');
    const [performers, setPerformers] = useState('John/Jane Doe');
    
    useEffect(() => {
        document.head.appendChild(state.fontLink);
        return () => document.head.removeChild(state.fontLink);
    }, [state.fontLink]);

    useEffect(() => {
        dispatch({ type: 'SET_FONTLINK', payload: state.titleFont });
    }, [dispatch, state.titleFont]);

    const getPerformance = (e) => {
        e.preventDefault();
        let performance = {
            'pieces': Array.isArray(pieces) ? pieces : [pieces], 
            'composers': Array.isArray(composers) ? composers : [composers], 
            'performers': Array.isArray(performers) ? performers : [performers]
        };
        dispatch({ type: 'SET_PAGE', payload: performance });
        resetPerformance();
        e.target.reset();
    }

    const resetPerformance = () => {
        setPieces('Untitled');
        setComposers('Anon.');
        setPerformers('John/Jane Doe');
    }

    return (
        <Form onSubmit={getPerformance}>
            <Form.Group className="mb-3" controlId="titleInput">
                <Form.Label>Program Title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="enter the title for your recital"
                    value={state.title}
                    onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
                    autoFocus={true} 
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="titleFont">
                    <Form.Label>Font</Form.Label>
                    <Form.Select 
                        htmlSize={5} 
                        value={state.titleFont}
                        onChange={(e) => dispatch({ type: 'SET_TITLEFONT', payload: e.target.value })}
                    >
                        <FontOptions />
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="titleSize">
                    <Form.Label>Size</Form.Label>
                    <Form.Select 
                        htmlSize={5} 
                        value={state.titleSize}
                        onChange={(e) => dispatch({ type: 'SET_TITLESIZE', payload: e.target.value })}
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
                    value={state.subtitle}
                    onChange={(e) => dispatch({ type: 'SET_SUBTITLE', payload: e.target.value })}
                />
            </Form.Group>

            <hr />

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
                <Form.Check type="switch" label='Place performer(s) on top' />
            </Form.Group>

            <hr />
            
            <Form.Group className='mb-3' controlId='footerInput'>
                <Form.Label>Footer</Form.Label>
                <Form.Control 
                    as="textarea"
                    placeholder="enter footer(s), if any" 
                    value={state.footer}
                    onChange={(e) => dispatch({ type: 'SET_FOOTER', payload: e.target.value })}
                />
            </Form.Group>
        </Form>
    );
}