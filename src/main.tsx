import  './main.less';
import  React from 'react';
import foo from './foo.js';
import {funBBB} from 'src/foo2.js';
import answer from 'the-answer';
import * as axios from 'axios';
console.log('the answer is ' + answer);
console.log('the axios is ' + axios);

export interface ButtonComponentProps {
    children:React.ReactNode;
}
export default class ButtonComponent extends React.Component<ButtonComponentProps> {
    render(){
        return (
            <button>ButtonComponent</button>
        )
    }
}

export  function MainT() {
    console.log(foo);
    console.log(funBBB);
}
