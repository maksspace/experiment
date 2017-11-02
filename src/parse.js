import parse from 'pug-parser';
import lex from 'pug-lexer';

/**
 * @param template {string}
 * @returns {object}
 */
export function parseToAST(template) {
    let tokens = lex(template);
    return parse(tokens, { src: template });
}