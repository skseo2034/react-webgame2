import React, {memo, useCallback, useEffect, useRef} from "react";
import { CLICK_CELL, CHANGE_TURN } from "./TicTacToe";

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    console.log('td rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]); // 무엇 때문에 리랜더링 되는지 확인하기 위해 각종 props 를 넣는다.

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex});

    }, [cellData]); // 바뀔것 같은 데이터를 넣어 주면 된다.

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;