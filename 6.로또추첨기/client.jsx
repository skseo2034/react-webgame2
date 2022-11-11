import React from "react";
import { createRoot } from 'react-dom/client';
import  Lotto  from './Lotto';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(
    <Lotto />
);
//ReactDom.render(<NumberBaseballClass />, document.querySelector('#root'));