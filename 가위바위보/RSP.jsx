import React, {useEffect, useRef, useState} from "react";
import useInterval from "./useInterval";

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    바위: 1,
    가위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(rspCoords.바위);
    const [imgCoord, seImgCoord] = useState(0);
    const [isRunning, setIsRunning] = useState(ture);



    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            seImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            seImgCoord(rspCoords.보);
        } else {
            seImgCoord(rspCoords.바위);
        }
    }

    useInterval(changeHand, isRunning ? 100 : null); // 커스텀 훅
   /* const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(changeHand, 100);
       return () => {
           clearInterval(interval.current);
       }
    }, [imgCoord]);*/

    // componentWillUnmount 예시
    /* useEffect(() => {
         // scroll 이벤트를 만들어줍니다. 스크롤을 움직일때 마다
         // onScroll 함수가 실행됩니다.
         window.addEventListener("scroll", onScroll);
         return () => window.removeEventListener("scroll", onScroll); <---- 집중 !!!
     }, []);*/
    const onClickBtn = (choice) => () => { // () => onClickBtn('바위') 을 간소화 하기 위해 () => 추가 : 고차함수
        if (isRunning) {
            // clearInterval(interval.current);
            setIsRunning(false);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore;
            if (diff === 0) {
                setResult('비겼습니다!');
            } else if ([-1, 2].includes(diff)) {
                setResult('이겼습니다1');
                setScore((prevScore) => {
                    return prevScore + 1;
                });
            } else {
                setResult('졌습니다!');
                setScore((prevScore) => {
                    return prevScore - 1;
                });
            }

            setTimeout(() => {
                // interval.current = setInterval(changeHand, 100);
                setIsRunning(true)
            }, 1000);
        }
    }
    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                {/* <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>*/}
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;