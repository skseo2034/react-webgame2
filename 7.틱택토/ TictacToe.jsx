import React, { useState, useReducer } from "react";
import Table from "./Table";


const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
};

const reducer = (state, action) => {

}

const TictacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    return (
        <>
            <Table />
            {winnner && <div>{winner}님의 승리</div>}
        </>
    )
};

export default TictacToe;
