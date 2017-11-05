import React from 'react';
import {render} from 'react-dom';
import {createStore, compose, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {pipe} from 'lodash/fp';
import {keys} from 'lodash';

const bind = (Component, handler) => props => {
    return (
        <Component {...props} {...handler}/>
    )
};

const eventProxy = (e) => {
    const target = e.target;
    const { name, value } = target;
    console.log('-----EVENT-----');
    console.log('tagName: ', target.tagName);
    console.log('name: ', name);
    console.log('value: ', value);
    console.log('-----/EVENT-----');
    return e;
};

const reduxActionType = (targetPrefix, eventName) => {
    return `${targetPrefix.toUpperCase()}/ACTION/${eventName.toUpperCase()}`;
};

const createChangesHandler = (targetPrefix, events, store) => {
    const prepareEvent = pipe( /* eventProxy, */ (e) => {
        const { name, value } = e.target;
        return { name, value };
    });

    const dispatchProxy = (preparedEvent) => {
        store.dispatch({
            type: reduxActionType(targetPrefix, preparedEvent.name),
            payload: preparedEvent
        });
    };
    return keys(events).reduce((changesHandlers, eventName) => {
        changesHandlers[eventName] = pipe(
            prepareEvent,
            dispatchProxy
        );
        return changesHandlers;
    }, {});
};

const createReducers = (targetPrefix, reducers) => {


    const reducersKeys = keys(reducers);
    return reducersKeys.reduce((finalReducers, eventName) => {
        finalReducers[reduxActionType(targetPrefix, eventName)] = pipe(reducers[eventName]);
        return finalReducers;
    }, {});
};

const loginFormInitialState = {
    login: '',
    password: ''
};

const loginFormHandlers =  {
    onInput: (store = {a:1}) => {
        console.log('===========');
        console.log('store: ', store);
        console.log('payload: ', store);
        console.log('===========');
        return { ...store }
    },

};

const reducer = combineReducers(
    createReducers('LOGIN_FORM', loginFormHandlers)
);

// const reducer = (store = ({ a: 1})) => {
//     return {
//         a: store.a + 1
//     }
// };


const store = createStore(reducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
));

const loginFormHandler = createChangesHandler('LOGIN_FORM', loginFormHandlers, store);

const LoginFormComponent = (props) => (
    <form {...props}>
        <input name='login'/>
        <input name='password' type='password'/>
        <button type='submit'>Login</button>
    </form>
);


const LoginForm = bind(LoginFormComponent, loginFormHandler);

const initialState = {
    loginForm: {
        name: '',
        password: '',
        error: null
    }
};

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <h3>Login form</h3>
                <LoginForm/>
            </div>
        </Provider>
    )
};

render(<App/>, document.getElementById('root'));