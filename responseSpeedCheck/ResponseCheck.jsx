import React, {useState} from "react";

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작해 주세요');
    const [result, setResult] = useState([]);

    const onClickScreen = () => {

    };

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
    };

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
            {/*{result.length === 0
                ? null
                : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>}*/}
            {/*{result.length != 0
                && <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>}*/}

        </>
    );
}

export default ResponseCheck;