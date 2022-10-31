import React, {useState} from "react";



const ResponseCheck = () => {
    let timeout;
    let startTime = 0;
    let endTime = 0;
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작해 주세요');
    const [result, setResult] = useState([0]);

    const onClickScreen = () => {

        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭 하세요.');

            timeout = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
            clearTimeout(timeout);
        } else if (state === 'now') { // 반응속도 케크
            endTime = new Date();
            setState('waiting')
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime - startTime];
            });
        }
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