# experiment
Experiment with react

### Что это такое
Я устроил небольшой эксперимент. Написать парсер компонентов описываемых в относительно простой форме,
в компоненты react.

### Зачем это все
Мне надоело что в react который я очень люблю, все делается очень сложно.
JSX это круто, но в реальных проектах юзать это становится очень утомительно. 

### Examples

```javascript
import { styled, wrap, component } from '...';

//
// Создаем простой компнет логина пользователя со спиннером и валидацией
//

const spinnerStyles = styled(`
  // любые стили для спиннера
  // главное что бы по умолчанию он был скрыт
  // а в классе active - он показывался
`);

const Spinner = styled`.loader`;
Spinnder.on('submit).then(loader => {
  return loader.toggle('active');
});

const inputErrorStyledComponent = styled({
  'input.error': {
    'border': '1px solid red'
  }
});

const LoginFormComponent = inputErrorStyledComponent`
  form
    input(name='login')
    input(name='password')
    button(type='submit') Login
`;

LoginFormComponent.on('validate')
  .then(({ login, password }) => {
    return login && password || Promise.reject();
  });

LoginFormComponen.on('submit').then(me => {
   // общаемся с бекендом и все такое
});

export const LoginForm = wrap(LoginFormComponent).with(Spinner);

// Как использовать в другом месте:

const LoginPage = component`
  h3 This is Login page
  LoginForm
`
```

К LoginForm можно применять все что угодно из мира react, в том числе prop-types -
в ключая то что по умолчанию name - переданые как пропсы - мапятся в defaultValue


