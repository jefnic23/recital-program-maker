export default function Title(props) {
    return (
        <div 
            style={{
                lineHeight: 'normal',
                textAlign: 'center',
                fontFamily: props.font ? `${props.font}` : 'Concert One',
                fontSize: props.size ? `${props.size}px` : '55px'
            }}
        >
            {props.title}
        </div>
    );
}