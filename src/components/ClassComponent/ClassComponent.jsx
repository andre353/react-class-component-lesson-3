import React from 'react';
import style from './ClassComponent.module.css';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 5,
    };
  }

  // доступа к state нет, так как функция handleSubmit НЕ ПРИВЯЗАНА 
  // К РЕАКТ КОМПОНЕНТУ И У НЕЕ НЕТ КОНТЕКСТА
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.number);
  }

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.number}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number' />
          <button className={style.btn}>Угадать</button>
        </form>
      </div>
    );
  }
}
