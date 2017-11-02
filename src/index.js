import React from 'react';
import {render} from 'react-dom';
import {parseToAST} from './parse';

const ast = parseToAST(`
button 123
`);

const unquote = str => str.slice(1, str.length - 1);

console.log(ast);

function wrap(ast, params) {
    if (!ast) return '';
    return ast.nodes.map((node, idx) => {
        const TagName = node.name;
        return (
            <TagName {...node.attrs} {...params} key={idx}>
                { wrap(node.block) || 'text' }
            </TagName>
        );
    })
}

const Root = wrap(ast, { onClick: () => console.log('LOG')});

console.log(Root)

const App = () => {
    return Root;
};

render(<App/>, document.getElementById('root'));