import React, { useEffect, useRef, useState } from 'react';

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
  const [renderCountTickets, setRenderCountTickets] = useState(5);
  const [isTicketsByFilter, setIsTicketsByFilter] = useState(false);

  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }
    isFirstRender.current = false;

    dicpatch(getTickets());
  }, []);

  return (
    <div className={s.App}>
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
        <Cards renderCountTickets={renderCountTickets} setIsTicketsByFilter={setIsTicketsByFilter} />
        {isTicketsByFilter && (
          <button className={s.ButtonMore} type="button" onClick={() => setRenderCountTickets(renderCountTickets + 5)}>
            Показать еще 5 билетов!
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
