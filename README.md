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

### 참고사항.
    - 리액트문법 작성시 리액트 컴포넌트는 대문자로 해야하고, 기존 html 은 소문자로 해야 한다.
      그리고 html 은 반드시 /> 닫아 줘야 한다. jsx 가 xml 이라 문법이 엄격함.
    - javascript 부분은 중괄호({) 로 감싸 줘야 한다.
    - jsx 문법안에서는 if 문과 for 사용불가 따라서 삼항연산자 또는 map 함수 사용
        - 코드 예시
            <button onClick={() => this.setState({liked: true})}>
                { this.state.liked ? 'Liked' : 'Like!'}
                {[1, 2, 3].map((i) => {
                    return <div>i</div>
                })}
            </button>
    - return 에는 태그 하나만 와야 한다.
        - 코드 예시
            return (
                <div> // 태그 하나만 와야 해서 div 로 감쌌다.
                    <button onClick={() => this.setState({liked: true})}>
                    {this.state.liked ? 'Liked' : 'Like!'}
                    {[1, 2, 3].map((i) => {
                    return <div>i</div>
                    })}
                    </button>
                    <input type="text"/>
                </div>
            )

            return (
            <> // <div></div> 대신 가짜 태그 fragement 도 가능하다.
                <button onClick={() => this.setState({liked: true})}>
                {this.state.liked ? 'Liked' : 'Like!'}
                {[1, 2, 3].map((i) => {
                return <div>i</div>
                })}
                </button>
                <input type="text"/>
            </>
            )
    - 리액트에서 객체(배열, function 등)를 함부로 바꾸지마라, 복사해라(불변성)
    - 리액트에서 document. 을 사용하지 않는다. dom 객체를 참조하고 싶다면 ref 를 사용해야 한다.
    - 리액트에서는 class 사용못함. 대신 className 사용해야 함.
        - <button id="button" className="className">클릭</button>
    - label에 for를 사용하면 안됩. 대신 htmlFor 을 사용해야 함.
    - babel install 라이브러리 들
        - @babel/core : babel 에 기본적인것들 가지고 있음.
        - @babel/preset-env : 최신문법을 브라우져에 맞게 엣날 문법을 지원하는것으로 바꿔 준다.
        - @babel/preset-react : jsx 를 지원가능하게 한다.
        - babel-loader : 바벨과 웹팩을 연곃해 준다.

## 주의상항.
    - 리액트는 array에 push 사용하면 안됨.
        - const arr = [];  push arr[1] => 이렇게 하면 리액트가 바뀐걸 인지 하지 못한다. 그래서 render 하지 않는다.
        - const arr1 = []; const arr2 = [...arr1, 1]; => 이런식으로 예전 배열을 복사해서 새로운 배열로 넣어야 한다.
    - 엣날 state 로 지금 현재 state 를 만들때는 함수형 state 를 사용해야 한다.
        - 코드 예제
            this.setState((prevState) => { // 함수형 state 사용
                return {
                result: '홈런!',
                tries: [...prevState.tries, { try: value, result: '홈런!' }],
                }
            });
    - hooks 사용시 setState 에 함수 넣을때 함수명만 넣어야 한다.
        - 코드 예제
            const [answer, setAnswer] = useState(getNumbers());
                => 이렇게 하면 랜더링 될때마다 실행된다. 문제는 되지 않지만, 첫번째 값세팅이후 두번째 부터는 무시한다.
                    다만, 쓸때없이 리랜더링 될때 마다 호출이 된다.
            const [answer, setAnswer] = useState(getNumbers); // lazy init => 함수에 return 값이 answer 로 들어간다. 그 다음부터는 실행되지 않는다.

## 참조사이트
- [바벨 브라우져 옵션 참고사이트](https://github.com/browserslist/browserslist)