import s from './Cards.module.scss';
import logo from '../../assets/images/S7Logo.svg';

function Cards() {
  return (
    <ul className={s.Cards}>
      {[1, 2, 3, 4, 5].map(() => (
        <li className={s.Card}>
          <header className={s.header}>
            <h2 className={s.price}>13 400 r</h2>
            <img src={logo} alt="s7" />
          </header>
          <ul className={s.flight}>
            <li>
              <h3 className={s.flightSubTitle}>MOW – HKT</h3>
              <div className={s.flightInfo}>10:45 – 08:00</div>
            </li>
            <li>
              <h3 className={s.flightSubTitle}>MOW – HKT</h3>
              <div className={s.flightInfo}>10:45 – 08:00</div>
            </li>
            <li>
              <h3 className={s.flightSubTitle}>MOW – HKT</h3>
              <div className={s.flightInfo}>10:45 – 08:00</div>
            </li>
          </ul>
          <ul className={s.flight}>
            <li>
              <h3 className={s.flightSubTitle}>MOW – HKT</h3>
              <div className={s.flightInfo}>10:45 – 08:00</div>
            </li>
            <li>
              <h3 className={s.flightSubTitle}>MOW – HKT</h3>
              <div className={s.flightInfo}>10:45 – 08:00</div>
            </li>
            <li>
              <h3 className={s.flightSubTitle}>MOW – HKT</h3>
              <div className={s.flightInfo}>10:45 – 08:00</div>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Cards;
