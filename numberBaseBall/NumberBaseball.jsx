import React, { Component } from 'react';
// const React = require('react');
// const { Component } = React;

// 숫자 4개를 랜덤하게 뽑는 함수
function getNumbers() {

}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = () => {

    };

    onChangeInput = () => {

    };

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    <li />
                </ul>
            </>
        )
    }
}



// module.exports = NumberBaseball;
export default NumberBaseball;
