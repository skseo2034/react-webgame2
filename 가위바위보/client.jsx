import React from "react";
import { createRoot } from 'react-dom/client';
import  RSP  from './RSP';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(
    <RSP />
);
//ReactDom.render(<NumberBaseballClass />, document.querySelector('#root'));