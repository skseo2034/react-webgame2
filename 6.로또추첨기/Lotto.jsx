import React, {Component, useEffect, useRef, useState} from "react";
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
    const [winNumbers, setWinNumbers] = useState(getWinNumbers()); // 당첨 숫자들
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null); // 보너스 공
    const [redo, setRedo] = useState(false);

    const timeouts = useRef([]);

    useEffect(() => {
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

        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }

    }, [timeouts.current]);

    const onClickRedo = () => {
        setWinNumbers(getWinNumbers()); // 당첨 숫자들
        setWinBalls([]);
        setBonus(null); // 보너스 공
        setRedo(false);
        timeouts.current = [];
    };

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} /> }
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>

    );
}

export default Lotto;