import React from "react";
import { createRoot } from 'react-dom/client';
import  WordRelay  from './WordRelay';
// import ReactDom from 'react-dom';
// const React = require('react');
// const ReactDom = require('react-dom');
// const WordRelay = require('./WordRelay');

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(
    <WordRelay />
);
//ReactDom.render(<WordRelay />, document.querySelector('#root'));