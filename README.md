# react-webgame
소스코드 레포지토리입니다.

# svelte-webgame
https://github.com/makefullstack/svelte-webgame

### 리액트란?.
    - 리액트는 자바스크립트다.
    - 리액트는 데이터 중심으로 움직인다.
    - 컴포넌터는 데이터와 화면을 묶어 놓은 덩어리라고 보면 된다.
        - 데이터는 state 가 데이터 이다.
        - 화면은 render 의 리턴 부분이다.
    - 리액트가 해결하고자 하는것 데이터 와 화면의 일치
        - 데이터가 바뀌면 화면은 자동으로 바뀐다.
    - 기존에는 화면의 버튼을 누르면 스크립트로 뭔가 하는 순서의 개발 이였다. 
        - 그러나 리액트는 반대로 사고를 해야 한다. => 이게 적응이 어려움.
        - 제일 간단한것은 화면에 바뀔 부분들은 state 로 만들어 두면 된다.
```
class LikeButton extends React.Component { // LikeButton 컴포넌트
    constructor(props) {
      super(props);
      this.state = {liked: false};  // 데이터 부분
    }

    render() {  
      if (this.state.liked) {
        return 'You liked this.';
      }
      
      // 이하 화면 부분
      return e('button', {onClick: () => this.setState({liked: true})}, 'Like');
    }
  }
```
