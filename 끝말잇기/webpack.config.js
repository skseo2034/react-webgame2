const path = require('path');
const {LoaderOptionsPlugin} = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],

    },
    plugins: [
       // new LoaderOptionsPlugin({ debug: true }),
        new RefreshWebpackPlugin(),
       /* new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ["dist", "public"],
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",     // 적용될 html 경로
            filename: "./index.html", // 결과 파일명
            meta: {
                // meta 태그를 추가
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
            },
            // hash: true,       // 모든 스크립트, css 파일에 고유한 컴파일 해시 추가하여 캐시를 무효화
            // showErrors: true, // 오류 정보가 html에 기록됨
        }),*/
    ],
    output: {
        path: path.join(__dirname, 'dist'), // 실제경로
        filename: 'app.js',
        publicPath: '/dist/', // 가상의 경로
    },
    devServer: {
        // publicPath: '/dist/',
        /*static: {
            directory: path.join(__dirname, "dist"),
        },*/
        devMiddleware: { publicPath: '/dist/' },
        static: { directory: path.resolve(__dirname) },
        hot: true,
        port: 80,
    },


};