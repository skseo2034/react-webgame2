import React, {memo, useEffect, useMemo, useRef} from "react";
import Td from "./Td";

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
    console.log('tr rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], rowData === ref.current[1], dispatch === ref.current[2]);
        ref.current = [rowIndex, rowData, dispatch];
    }, [rowIndex, rowData, dispatch]);

    return (
        <tr>
            <Td dispatch={dispatch}/>
            {Array(rowData.length).fill().map((td, i) => (
                useMemo( // 컴포넌트를 기억한다.
                    () => <Td key={i} fowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
                    [rowData[i]],
                )
            ))}
        </tr>
    );
});

export default Tr;