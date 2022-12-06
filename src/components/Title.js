import { useContext, useLayoutEffect, useRef } from "react";
import { Context } from '../Store';

export default function Title(props) {
    const [state, dispatch] = useContext(Context);
    const ref = useRef();

    useLayoutEffect(() => {
        let height = ref.current.clientHeight;
        if (height !== state.titleHeight) dispatch({ type: 'SET_TITLEHEIGHT', payload: height });
    }, [state, dispatch, props.title]);

    return (
        <div ref={ref}
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