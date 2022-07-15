import React from 'react';
import style from './ClassComponent.module.css';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 5,
      userNumber: '',
    };
  }

  // доступа к state нет, так как функция handleSubmit НЕ ПРИВЯЗАНА
  // К РЕАКТ КОМПОНЕНТУ И У НЕЕ НЕТ КОНТЕКСТА, но если ее сделать стрелочной
  // у нее не будет своего контекста,
  // но она связывается с лексическим окружением,
  // то есть функцией, внутри которой определена стрелочная функция.
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.number);
  };

  handleChange = (e) => {
    this.setState(() => (
      {
        userNumber: e.target.value,
      }
    ));
    console.log(this.state);
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.number}</p>
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
