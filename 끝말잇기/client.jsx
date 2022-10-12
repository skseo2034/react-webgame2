const React = require('react');
const ReactDom = require('react-dom');
//import React from "react";
//import ReactDom from 'react-dom';
//const WordRelay = require('./WordRelay');
import  WordRelay  from './WordRelay';

ReactDom.render(<WordRelay />, document.querySelector('#root'));