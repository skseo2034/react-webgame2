import Tr from "./Tr";

const Table = ({ onClick, tableData }) => {
    return (
        <table onClick={onClick}>
            {Array(tableData.length).fill().map((tr, i) => (<Tr rowData={tableData[i]} />))}
        </table>
    );
};

import React from "react";

export default Table;