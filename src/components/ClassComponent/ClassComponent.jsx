import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  // обращение к props внутри конструктора нежелательно,
  // т.к.если props поменяются, когда
  // компонент будет уже выведен на страницу, то значение свойства,
  // зависящее от этих props не будет заново создано, потому что
  // КОНСТРУКТОР ВЫЗЫВАЕТСЯ ОДИН РАЗ
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
      count: 0,
    };
  }

  // доступа к state нет, так как функция handleSubmit НЕ ПРИВЯЗАНА
  // К РЕАКТ КОМПОНЕНТУ И У НЕЕ НЕТ КОНТЕКСТА, но если ее сделать стрелочной
  // у нее не будет своего контекста,
  // но она связывается с лексическим окружением,
  // то есть с функцией, внутри которой определена стрелочная функция.
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(prevstate => {
      if (!prevstate.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (!prevstate.userNumber > prevstate.randomNumber) {
        return {
          result: `${prevstate.userNumber} больше загаданного`,
        };
      }

      if (!prevstate.userNumber < prevstate.randomNumber) {
        return {
          result: `${prevstate.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали загаданное число ${prevstate.userNumber}. 
        Использовано ${prevstate.count} попыток.`,
      };
    });
  };

  handleChange = (e) => {
    this.setState((prevstate, props) => ({
      userNumber: e.target.value,
    }), () => {// через колбэк получаем новейшее состояние значений state
      console.log(this.state);
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>

          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>

          <input
            className={style.input}
            onChange={this.handleChange}
            value={this.state.userNumber}
            type="number"
            id="user_number"
          />

          <button className={style.btn}>Угадать</button>

        </form>

      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
