import React, {useState, useReducer, useContext} from "react";
import Table from "./Table";


const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
};

const SET_WINNER = 'SET_WINNER';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            }
    }
}

const TictacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    const onClickTable = useContext(() => {
        dispatch({ type: SET_WINNER, winner: 'O' })
    }, []);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData}/>
            {state.winnner && <div>{state.winner}님의 승리</div>}
        </>
    )
};

export default TictacToe;
