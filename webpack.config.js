import { resolve as _resolve } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const entry = './src/index.js';
export const output = {
    filename: 'bundle.js',
    path: _resolve(__dirname, 'dist')
};
export const resolve = {
    extensions: ['.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({
        configFile: "./jsconfig.json" // We can use jsconfig.json for JavaScript projects
    })],
    alias: {
        '@': _resolve(__dirname, 'src')
    }
};
export const module = {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }
    ]
};
