import Title from '../components/Title';
import Subtitle from '../components/Subtitle';

export default function ProgramHeader(props) {
    return (
        <>
            <div className="header">
                    <Title title={props.title} font={props.font} size={props.size} />
                    <Subtitle subtitle={props.subtitle} />
            </div>
            <hr className='style1' />
        </>
    );
}