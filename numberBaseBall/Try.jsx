import React from 'react';

const Try = ({tryInfo}) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}

/*const Try = ({props}) => {
    return (
        <li>
            <div>{props.tryInfo.try}</div>
            <div>{props.tryInfo.result}</div>
        </li>
    )
}*/
/*class Try extends Component {
    render() {
        return (
           <li>
               <div>{this.props.tryInfo.try}</div>
               <div>{this.props.tryInfo.result}</div>
           </li>
        )
    }
}*/

export default Try;