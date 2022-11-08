import React, {useEffect, useRef, useState} from "react";


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
    const interval = useRef();

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            seImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            seImgCoord(rspCoords.보);
        } else {
            seImgCoord(rspCoords.바위);
        }
    }
    useEffect(() => { // 랜더링 후 실행, JSP 기준 document ready, DOMContentLoaded, 리액트 class componentDidMount(), compnentDidUpdate 역할
        interval.current = setInterval(changeHand, 100);
        return () => { // class componentWillUnmount 역할
            clearInterval(interval.current);
        };
        //return () => clearInterval(interval);
        //clearInterval(interval);
    }, [imgCoord]); // 랜더링 직후 함번만 실행 위해 빈배열 넣음. [result] 를 넣으면 setResult 될때 마다 실행(class componentDidUpdate )

    /*useEffect(() => {
        window.addEventListener("interval", setInterval);
       return () => window.removeEventListener("interval", setInterval);
        // return () => clearInterval(interval);
    }, []);*/

    // componentWillUnmount 예시
    /* useEffect(() => {
         // scroll 이벤트를 만들어줍니다. 스크롤을 움직일때 마다
         // onScroll 함수가 실행됩니다.
         window.addEventListener("scroll", onScroll);
         return () => window.removeEventListener("scroll", onScroll); <---- 집중 !!!
     }, []);*/
    const onClickBtn = (choice) => () => { // () => onClickBtn('바위') 을 간소화 하기 위해 () => 추가 : 고차함수
        clearInterval(interval.current);
        const myScore = scores[choice];
        console.log('seo >>>>>>>>>>>>>>', choice, myScore);
        const cpuScore = scores[computerChoice(imgCoord)];
        console.log('seo11 >>>>>>>>>>>>>>', imgCoord, cpuScore);
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
            interval.current = setInterval(changeHand, 100);
        }, 2000);

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