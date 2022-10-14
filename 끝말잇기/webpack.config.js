const path = require('path');

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
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },

};