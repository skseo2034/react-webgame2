import React, { useReducer, createContext, useMemo } from "react";
import Table from "./Table";
import Form from "./Form";

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 OPENED
}

export const TableContext = createContext({ // 초기값, 현재는 그냥 모양만 맞춘것
    tableData: [
        [-1, -1, -1, -1, -1, -1, -1],
        [-7, -1, -1, -1, -1, -1, -1],
        [-1, -7, -1, -7, -7, -1, -1],
    ],
    dispatch: () => {},
});

const init = initialState => {
    return {
        tableData: [],
        timer: 0,
        result: '',
        halted: false,
    }
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() *  candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)
            }
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            return {
                ...state,
                tableData,
                halted: false,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: ture,
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }

            return {
                ...state,
                tableData,
                halted: ture,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }

            return {
                ...state,
                tableData,
                halted: ture,
            };
        }

        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, init);
    const { tableData, halted } = state;
    const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch }), [tableData, halted]); // dispatch 는 절대 바뀌지 않으므로 [] 여기 바뀌는 목록에 추가 하지 않아도 된다.
    return (
        // 자식컴포넌트에서 바로 tableData 에 접근할 수 있다. 이렇게 하면 매번 리랜더링 된다. 따라서 성능에 문제가 발생 할 수 있다.
        // 따라서 매번 리랜더링 되지 않게 useMemo 를 사용하여 캐싱을 해 준다.
        <TableContext.Provider value={value}>
            <Form />
                <div>{state.timer}</div>
                <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch;