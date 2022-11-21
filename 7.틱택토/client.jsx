import React from "react";
import { createRoot } from 'react-dom/client';
import   TicTacToe  from './TicTacToe';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(
    < TicTacToe />
);
//ReactDom.render(<NumberBaseballClass />, document.querySelector('#root'));