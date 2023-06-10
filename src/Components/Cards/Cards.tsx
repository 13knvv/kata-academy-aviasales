import moment from 'moment';
import s from './Cards.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';

function Cards() {
  const tickets = useTypedSelector((state) => state.tickets.tickets);

  const formatDuration = (duration: number): string => {
    if (duration < 60) return `${duration}м`;

    const hour = Math.floor(duration / 60);
    const min = duration % 60;

    return `${hour}ч ${min}м`;
  };

  const formatTime = (date: string, duration: number) => {
    const from = moment(date).format('H:mm');
    const to = moment(date).add(duration, 'm').format('H:mm');

    return `${from} - ${to}`;
  };

  const formatStopsCount = (num: number): string => {
    let word = 'пересадки';
    if (num === 0 || num >= 5) word = 'пересадок';
    if (num === 1) word = 'пересадка';

    return `${num} ${word}`;
  };

  const formatStops = (stops: string[]): string => stops.join(', ');

  const cards = tickets.map((ticket) => {
    const {
      price,
      carrier,
      segments: [
        {
          origin: originThere,
          destination: destinationThere,
          date: dateThere,
          stops: stopsThere,
          duration: durationThere,
        },
        { origin: originBack, destination: destinationBack, date: dateBack, stops: stopsBack, duration: durationBack },
      ],
    } = ticket;

    return (
      <li
        className={s.Card}
        key={price + carrier + originThere + destinationThere + dateThere + originBack + destinationBack + dateBack}
      >
        <header className={s.header}>
          <h2 className={s.price}>{price} Р</h2>
          <img src={`http://pics.avs.io/99/36/${carrier}.png`} alt="Logo" />
        </header>
        <ul className={s.flight}>
          <li>
            <h3 className={s.flightSubTitle}>
              {originThere} – {destinationThere}
            </h3>
            <div className={s.flightInfo}>{formatTime(dateThere, durationThere)}</div>
          </li>
          <li>
            <h3 className={s.flightSubTitle}>В пути</h3>
            <div className={s.flightInfo}>{formatDuration(durationThere)}</div>
          </li>
          <li>
            <h3 className={s.flightSubTitle}>{formatStopsCount(stopsThere.length)}</h3>
            <div className={s.flightInfo}>{formatStops(stopsThere)}</div>
          </li>
        </ul>
        <ul className={s.flight}>
          <li>
            <h3 className={s.flightSubTitle}>
              {originBack} – {destinationBack}
            </h3>
            <div className={s.flightInfo}>{formatTime(dateBack, durationBack)}</div>
          </li>
          <li>
            <h3 className={s.flightSubTitle}>В пути</h3>
            <div className={s.flightInfo}>{formatDuration(durationBack)}</div>
          </li>
          <li>
            <h3 className={s.flightSubTitle}>{formatStopsCount(stopsBack.length)}</h3>
            <div className={s.flightInfo}>{formatStops(stopsBack)}</div>
          </li>
        </ul>
      </li>
    );
  });

  return <ul className={s.Cards}>{cards}</ul>;
}

export default Cards;
