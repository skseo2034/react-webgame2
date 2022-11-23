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
    - 라이프 사이클
        - 클래스의 경우
            constructor -> render -> componentDidMount 
            -> (setState/props 바뀔때 -> shouldComponentUPdate -> render -> componentDidUpdate)
            -> 부모 컴포넌트가 나(자식 컴포넌트)를 없앨때 -> componentWillUnmount -> 소멸
    - 통상 특정 hooks 가 2개이상 반복 될때 custom hooks 를 만드는게 좋다.
        - useEffect 와 useRef 가 custom hooks 로 만들기 좋다.
    - 개발시 console.log 를 함수 마다 넣어라. 그래서 필요할때 마다 호출 되는지 확인 하는게 좋다.
    - 훅스를 사용할때는 함수컴포넌트가 실행 될때 마다 함수전체가 실행됨으로 같이 실행이 된다.
        따라서 아래에 getWinNumbers() 도 매번 실행이 된다. 만약 10초이상 걸리는 함수라면? 문제가 된다.
            const Lotto = () => {
                const lottoNumbers = useMemo(() => getWinNumbers(), []);
                ....
            }
        이때 useMemo 를 사용한다. useMemo 는 getWinNUmbers() 기억했다가  사용함으로 실행 되지 않는다.
        참고로 useMemo 와 useCallback 는 뒤에 파라메터 인자가 하나더 있다.([]) 여기에 값이 있으면, 이값이 변할때 실행 된다.
        복잡한 함수결과값 저장은 useMemo, 일반값 기억은 useRef를 사용하면 된다.
    - useEffect 는 componentDidMount 에서 무조건 발생한다.
      그런데. componentDidUpdate 에서만 하고 싶다. (componentDidMount 에서는 실행 안하고 싶을때)
      이때 꼼수사용. 코드 예제
        const mounted = useRef(false);
        useEffect(() => {
            if (!mounted.current) { // componentDidMount 에서 실행은 되나 아무것도 안한다.
                mounted.current = true;
            } else {
                // ajax 요청
            }
        }, [바뀌는값]);
    - componentDidMount 에서만 하고 싶다.
        - 코드예
        useEffect(() => {
           // ajax
        }, []); // 빈배열로 주면 componentDidMount 에서만 실행
    - useReducer는 useState처럼 State를 관리하고 업데이트 할 수 있는 Hook  이다.
    - 부모과 자식 관계의 컴포넌트에 있어서 그 깊이가 깊을때, 부모-> 자식 -> 자식 -> 자식...일때 props 를 넘길때 복잡하다.
        - 이때 Context API를 사용한다.

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
    - 리액트는 state 가 바뀌거나, pops 가 바뀔때만 리랜더링 되는게 아니라, 부모가 바뀔때 자식 컴포넌트도 같이 리랜더링 된다.
        - 이렇게 자식 컴포넌트의 리랜더링을 막기위해서 class 에서는 PureComponent 를 사용하고, hooks 에서는 memo 를 사용한다.
        - 코드예제.
            import React, { memo } from 'react';
            
            const Try = memo(({tryInfo}) => {
                        return (
                            <li>
                                <div>{tryInfo.try}</div>
                                <div>{tryInfo.result}</div>
                            </li>
                        )
            });
    - 전달 받은 props 는 부모에서 바꿔야 한다. 단, 바꾸고 싶을때는 state 를 사용한다. => 좋은 구조 아님.
        그래야 부모한테 영향을 안 미친다. 자식이 바꿔야 한다면 반드시 state 를 사용한다.
        - 코드 예제
            const Try = memo(({tryInfo}) => {
                tryInfo.resule = 'hello'; // 안됨!!
                return (
                    <li>
                        <div>{tryInfo.try}</div>
                        <div>{tryInfo.result}</div>
                    </li>
                )
            });
            => 바꾸고 싶으면 setState 사용
            const Try = memo(({tryInfo}) => {
                const [result, setResult] = useState(tryInfo.result);

                const onClick = () => {
                    setResult('1');
                };
                return (
                    <li>
                        <div>{tryInfo.try}</div>
                        <div onClick={onClick}>{result}</div>
                    </li>
                )
            });
    - useState 는 바뀌면 return 부분이 랜더링 되지만, useRef 는 랜더링 되지 않는다.
        그래서 값이 바뀌어도 랜더링 하지 않고 싶다면 useRef 를 사용하면 된다.
    - 자식 컴포넌트에 props 로 함수를 넘길때는 useCallback 를 꼭 해야 한다. (Lotto.jsx 참고)
        - 코드 예제
            const onClickRedo = useCallback(() => { // useCallback 는 함수자체를 기억한다.
               .....
            }, [winNumbers]); 
            return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} onClick={onClickRedo()}/> } // 자식 컴포넌트에 props 로 함수를 넘길때는 useCallback 를 꼭 해야 한다.
                {redo && <button onClick={onClickRedo}>한 번 더!</button>}
            </>

    );
    - 훅스(hooks) 는 반드시 순서를 지켜야 한다.
        - 따라서 조건문이나 반복문에 넣어면 안된다.
        - 코드예 
            const lottoNumbers = useMemo(() => getWinNumbers(), []);
            const [winNumbers, setWinNumbers] = useState(getWinNumbers()); // 당첨 숫자들
            const [winBalls, setWinBalls] = useState([]);
            if (조건) { // 이럴경우 조건에 따라 훅스 순서가 변경된다. 이러면 안된다.
                const [bonus, setBonus] = useState(null); // 보너스 공
            } 
            const [redo, setRedo] = useState(false);
    - useEffect, useCallback, useMemo 안에서 useState 를 사용한면 안된다.
    - 리액트는 비동기이다. 리덕스의 경우 동기라서 헷갈리지 마라.
        - 따라서 리액트에서 state 는 비동기이고, 비동기인 state 에서 뭔가를 처리 하려면 useEffect 를 사용해야 한다.
        - 코드예
            const onClickTd = useCallback(() => {
                console.log(rowIndex, cellIndex);
                if (cellData) {
                    return;
                }
                dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex});
                dispatch({ type: CHANGE_TURN });
                state.turn; // 비동기라 이전 turn 값이 찍힌다. 위에 CHANGE_TURN 이 있음에도.
            }, [cellData]);

## 참조사이트
- [바벨 브라우져 옵션 참고사이트](https://github.com/browserslist/browserslist)
- [useRef 언제 사용하는가?](https://yoonjong-park.tistory.com/entry/React-useRef-%EB%8A%94-%EC%96%B8%EC%A0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%EA%B0%80)
- [React Hooks :: useReducer에 대해 알아보기](https://velog.io/@iamhayoung/React-Hooks-useReducer%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)

## 기타 TIP
- npm clean
    rm -rf node_modules
    rm -f package-lock.json
    rm -f yarn.lock
    npm cache clean --force
    npm install