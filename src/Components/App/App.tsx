import React, { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { setSortBy } from '../../redux/sortReducer';
import useTypedSelector from '../../hooks/useTypedSelector';

import s from './App.module.scss';
import logo from '../../assets/images/logo.svg';
import Cards from '../Cards/Cards';
import Filter from '../Filter/Filter';
import { getTickets } from '../../redux/ticketsReducer';

function App() {
  const isFirstRender = useRef<boolean>(true);
  const sortBy = useTypedSelector((state) => state.sort.sortBy);
  const dicpatch = useDispatch();

  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }
    isFirstRender.current = false;

    try {
      dicpatch(getTickets());
    } catch (error) {
      console.log('error getTickets');
    }
  }, []);

  return (
    <div className={s.App}>
      <button type="button" onClick={() => dicpatch(getTickets())}>
        get
      </button>
      <img className={s.AppLogo} src={logo} alt="Aviasales" />
      <aside className={s.AppAside}>
        <Filter />
      </aside>
      <main className={s.AppMain}>
        <ul className={s.Tabs}>
          <li className={s.TabsItem}>
            <button
              type="button"
              className={`${s.Tab} ${sortBy === 'cheap' ? s.TabActive : ''}`}
              onClick={() => dicpatch(setSortBy('cheap'))}
            >
              Самый дешевый
            </button>
          </li>
          <li className={s.TabsItem}>
            <button
              type="button"
              className={`${s.Tab} ${sortBy === 'fast' ? s.TabActive : ''}`}
              onClick={() => dicpatch(setSortBy('fast'))}
            >
              Самый быстрый
            </button>
          </li>
          <li className={s.TabsItem}>
            <button
              type="button"
              className={`${s.Tab} ${sortBy === 'optimal' ? s.TabActive : ''}`}
              onClick={() => dicpatch(setSortBy('optimal'))}
            >
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
