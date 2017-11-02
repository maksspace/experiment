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
import { styled, wrap } from '...';

//
// Создаем простой компнет логина пользователя со спиннером и валидацией
//

const spinnerStyles = styled(`
  // любые стили для спиннера
  // главное что бы по умолчанию он был скрыт
  // а в классе active - он показывался
`);

const Spinner = styled`.loader`;
Spinnder.onSubmit = ({ loader }) => {
  loader.active = true;
};

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

LoginFormComponent.validate = ({ login, password }) => {
  return login && password; // просто не пустые
};

LoginFormComponent.onSubmit = me => {
  // общаемся с бекендом и все такое
};

export const LoginForm = wrap(LoginFormComponent).with(Spinner);

```

К LoginForm можно применять все что угодно из мира react, в том числе prop-types -
в ключая то что по умолчанию name - переданые как пропсы - мапятся в defaultValue
