import React from "react";
import { createRoot } from 'react-dom/client';
import  ResponseCheck  from './ResponseCheck';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(
    <ResponseCheck />
);
//ReactDom.render(<NumberBaseballClass />, document.querySelector('#root'));