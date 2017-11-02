import React from 'react';
import {render} from 'react-dom';
import {parseToAST} from './parse';

const ast = parseToAST(`
button(type="submit", className="Helloworld")
`);

const unquote = str => str.slice(1, str.length - 1);

console.log(ast);

function wrap(ast) {
    const elemsCount = ast.nodes.length;
    switch (elemsCount) {
        case 1:
            const elem = ast.nodes[0];
            return elem;
    }
}

const Button = ({ children, ...props }) => {
    return <button {...props}>{children}</button>;
};

console.log(wrap(ast));

const App = () => {
    return <Button/>;
};

render(<App/>, document.getElementById('root'));