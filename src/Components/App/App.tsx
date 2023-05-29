import React from 'react';
import s from './App.module.scss';
import logo from '../../assets/images/logo.svg';
import Cards from '../Cards/Cards';
import TransfersForm from '../TransfersForm/TransfersForm';

function App() {
  return (
    <div className={s.App}>
      <img className={s.AppLogo} src={logo} alt="Aviasales" />
      <aside className={s.AppAside}>
        <TransfersForm />
      </aside>
      <main className={s.AppMain}>
        <ul className={s.Tabs}>
          <li className={s.TabsItem}>
            <button className={`${s.Tab} ${s.TabActive}`} type="button">
              Самый дешевый
            </button>
          </li>
          <li className={s.TabsItem}>
            <button className={s.Tab} type="button">
              Самый быстрый
            </button>
          </li>
          <li className={s.TabsItem}>
            <button className={s.Tab} type="button">
              Оптимальный
            </button>
          </li>
        </ul>
        <Cards />
        <button className={s.ButtonMore} type="button">
          Показать еще 5 билетов!
        </button>
      </main>
    </div>
  );
}

export default App;
