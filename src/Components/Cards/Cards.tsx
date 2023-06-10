import LoadingBar from 'react-top-loading-bar';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import s from './Cards.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';

interface IPropsCards {
  renderCountTickets: number;
  setIsTicketsByFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cards({ renderCountTickets, setIsTicketsByFilter }: IPropsCards) {
  const tickets = useTypedSelector((state) => state.tickets.tickets);
  const sortBy = useTypedSelector((state) => state.sort.sortBy);
  const { all, withoutTransfers, oneTransfer, twoTransfers, threeTransfers } = useTypedSelector(
    (state) => state.filter
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(tickets.length / 95.55);
  }, [tickets]);

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

  const filteredTickets = tickets.filter((ticket) => {
    const {
      segments: [{ stops: stopsThere }],
    } = ticket;

    const stopsCount = stopsThere.length;

    if (all) return true;
    if (withoutTransfers && stopsCount === 0) return true;
    if (oneTransfer && stopsCount === 1) return true;
    if (twoTransfers && stopsCount === 2) return true;
    if (threeTransfers && stopsCount === 3) return true;

    return false;
  });

  filteredTickets.sort((a, b) => {
    if (sortBy === 'cheap') {
      return a.price - b.price;
    }
    if (sortBy === 'fast') {
      return a.segments[0].duration - b.segments[0].duration;
    }
    if (sortBy === 'optimal') {
      if (a.segments[0].duration - b.segments[0].duration > 0 && a.price - b.price > 0) {
        return 1;
      }
      if (a.segments[0].duration - b.segments[0].duration < 0 && a.price - b.price < 0) {
        return -1;
      }
    }
    return 0;
  });

  const filteredSortedTickets = filteredTickets.slice(0, renderCountTickets);

  const cards = filteredSortedTickets.map((ticket) => {
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
          <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="Logo" className={s.logo} />
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

  useEffect(() => {
    setIsTicketsByFilter(!!cards.length);
  }, [cards.length]);

  return (
    <ul className={s.Cards}>
      <LoadingBar color="#2196F3" height={5} progress={progress} onLoaderFinished={() => setProgress(0)} />
      {cards.length || !tickets.length ? cards : <div>Рейсов, подходящих под заданные фильтры, не найдено</div>}
    </ul>
  );
}

export default React.memo(Cards);
