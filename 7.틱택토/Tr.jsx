import React from "react";
import Td from "./Td";

const Tr = ({ rowIndex, rowData, dispatch }) => {
    return (
        <tr>
            <Td dispatch={dispatch}/>
            {Array(rowData.length).fill().map((td, i) => (<Td fowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>))}
        </tr>
    );
};

export default Tr;