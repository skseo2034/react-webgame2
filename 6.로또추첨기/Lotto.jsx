import React, { Component, useEffect, useRef, useState, useMemo, useCallback } from "react";
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    // 훅스를 사용할때는 함수컴포넌트가 실행 될때 마다 함수전체가 실행됨으로 같이 실행이 된다.
    // 따라서 아래에 getWinNumbers() 도 매번 실행이 된다. 만약 10초이상 걸리는 함수라면? 문제가 된다.
    // 이때 useMemo 를 사용한다. useMemo 는 getWinNUmbers() 기억했다가  사용함으로 실행 되지 않는다.
    // 참고로 useMemo 와 useCallback 는 뒤에 파라메터 인자가 하나더 있다.([]) 여기에 값이 있으면, 이값이 변할때 실행 된다.
    // 복잡한 함수결과값 저장은 useMemo, 일반값 기억은 useRef를 사용하면 된다.
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(getWinNumbers()); // 당첨 숫자들
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null); // 보너스 공
    const [redo, setRedo] = useState(false);

    const timeouts = useRef([]);

    const onClickRedo = useCallback(() => { // useCallback 는 함수자체를 기억한다.
        console.log('onClickRedo');
        console.log(winNumbers); // 이 값은 변해야 하나 변하지 않는다. 따라서 useCallback 두번째인자에 이값을 넣는다.
        setWinNumbers(getWinNumbers()); // 당첨 숫자들
        setWinBalls([]);
        setBonus(null); // 보너스 공
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]); // 값을 변경하기 위해 두번째 인자에 넣음.

    // componentDidMount 에서만 하고 싶다.
    useEffect(() => {
       // ajax
    }, []); // 빈배열로 주면 componentDidMount 에서만 실행

    // useEffect 는 componentDidMount 에서 무조건 발생한다.
    // 그런데. componentDidUpdate 에서만 하고 싶다. (componentDidMount 에서는 실행 안하고 싶을때)
    // 꼼수사용.
    /*const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) { // componentDidMount 에서 실행은 되나 아무것도 안한다.
            mounted.current = true;
        } else {
            // ajax 요청
        }
    }, [바뀌는값]);*/


    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1;i++) {
            timeouts.current[i] = setTimeout(() => {
               setWinBalls((prevWinBalls) => {
                  return [...prevWinBalls, winNumbers[i]];
               })
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
                setBonus(winNumbers[6]);
                setRedo(true);
        }, 7000);

        return () => {  // componetWillUnmount 는 return 만 하면 대체 된다.
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
    }, [winNumbers]); // 빈 배열이면 componetDidMount 와 동일
    // 배일에 요소가 있으면 componentDidMount, componetDidUpdate 둘다 수행



    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} onClick={onClickRedo()}/> } // 자식 컴포넌트에 props 로 함수를 넘길때는 useCallback 를 꼭 해야 한다.
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>

    );
}

export default Lotto;