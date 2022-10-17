import React, { Component } from 'react';
// const React = require('react');
// const { Component } = React;

 class WordRelay extends Component {
    state = {
        word: '제로초3',
        value: '',
        result: '',
    };

     onSubmitForm = (e) => {
         e.preventDefault();
         console.log('aaa>>>>>>>>>>', this.state.word[this.state.word.length -1], this.state.value);
         if (this.state.word[this.state.word.length -1] == this.state.value[0]) {
             this.setState({
                 result: '딩동댕',
                 word: this.state.value,
             });
         } else {
             this.setState({
                 result: '땡!!!',
             });
         }

         this.setState({
             value: '',
         });
         this.input.focus();
     };

     onChangeInput = (e) => {
        this.setState({value: e.target.value});
     };

     input;

     onRefInput = (c) => {
        this.input = c;
     };
    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

// module.exports = WordRelay;
export default WordRelay;
