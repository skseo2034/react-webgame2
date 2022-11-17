import React from "react";
import { createRoot } from 'react-dom/client';
import   TictacToe  from './ TictacToe';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(
    < TictacToe />
);
//ReactDom.render(<NumberBaseballClass />, document.querySelector('#root'));