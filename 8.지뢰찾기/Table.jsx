import React, { useContext } from "react";
import Tr from "./Tr";
import { TableContext } from "./MineSearch";

const Table = () => {
    const { tableData } = useContext(TableContext);
    return (
        <table>
            {Array().fill().map((tr, i) => <Tr rowIndex={i}/>)}
        </table>

    )
}

export default Table;