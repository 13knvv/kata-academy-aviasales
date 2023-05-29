import s from './Cards.module.scss';

function Cards() {
  return (
    <ul className={s.Cards}>
      <li className={s.Card}>card</li>
      <li className={s.Card}>card</li>
      <li className={s.Card}>card</li>
      <li className={s.Card}>card</li>
      <li className={s.Card}>card</li>
    </ul>
  );
}

export default Cards;
