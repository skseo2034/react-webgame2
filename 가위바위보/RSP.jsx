import React, {useEffect, useRef, useState} from "react";


const RSP = () => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, seImgCoord] = useState(0);

    useEffect(() => { // 랜더링 후 실행, JSP 기준 document ready, DOMContentLoaded, 리액트 class componentDidMount()
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((users) => {
                setUsers(users);
                setLoading(false);
            });
    }, []); // 랜더링 직후 함번만 실행 위해 빈배열 넣음. [result] 를 넣으면 setResult 될때 마다 실행(class componentDidUpdate )

    // componentWillUnmount 예시
   /* useEffect(() => {
        // scroll 이벤트를 만들어줍니다. 스크롤을 움직일때 마다
        // onScroll 함수가 실행됩니다.
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll); <---- 집중 !!!
    }, []);*/

    return (
        <>
            <div id"computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id-"rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
                <button id-"scissor" className="btn" onClick={() => onClickBtn('가위')}>바위</button>
                <button id-"paper" className="btn" onClick={() => onClickBtn('보')}>바위</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;