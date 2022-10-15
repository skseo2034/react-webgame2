const path = require('path');
const {LoaderOptionsPlugin} = require('webpack');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // production
    devtool: 'eval', // hidden-source-map

    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        // app: ['./client.jsx', './WordRelay.jsx'] // client.jsx 에서 WordReplay.jsx 를 불러오기 때문에 실제로는 필요없다. weppack 이 알아서 해석해 준다.
        app: ['./client.jsx'] // 확장자를 넣기 귀찮으면 resolve 로 넣어 놓으면 된다.
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                // 바렐 로드시 옵션을 지원한다. 각각 옵션에 또 설정을 할 수있는데 그때는
                // 처럼 각각의 옵션에 [옵션명, {옵션내 옵션}] 이렇게 할 수 있다.
                /*presets: [
                    ['@babel/preset-env', {
                   targets: {
                       browsers: ['> 1% in KR'], // 바벨 적용시 한국사용 브라우져에 5% 이상인건에 맞줘서 하겠다.
                   },
                   debug: true, // 개발에서 사용.
                }],
                    '@babel/preset-react'],*/
                presets: ['@babel/preset-env', '@babel/preset-react'], // 설정없는 기본적용.
            },
        }],
    },
    plugins: [
        new LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },

};