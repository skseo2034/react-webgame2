import React from "react";
import { createRoot } from 'react-dom/client';
import   MineSearch  from './MineSearch';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(
    < MineSearch />
);
//ReactDom.render(<NumberBaseballClass />, document.querySelector('#root'));