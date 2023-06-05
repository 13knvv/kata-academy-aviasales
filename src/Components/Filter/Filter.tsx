import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import s from './Filter.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import { setAllFilters, setFilter, setFilterAll } from '../../redux/filterReducer';

function Filter() {
  const dispatch = useDispatch();
  const isAll = useTypedSelector((state) => state.filter.all);
  const isWithoutTransfers = useTypedSelector((state) => state.filter.withoutTransfers);
  const isOneTransfer = useTypedSelector((state) => state.filter.oneTransfer);
  const isTwoTransfers = useTypedSelector((state) => state.filter.twoTransfers);
  const isThreeTransfers = useTypedSelector((state) => state.filter.threeTransfers);

  useEffect(() => {
    if (isWithoutTransfers && isOneTransfer && isTwoTransfers && isThreeTransfers) {
      dispatch(setFilterAll(true));
    } else {
      dispatch(setFilterAll(false));
    }
  }, [isWithoutTransfers, isOneTransfer, isTwoTransfers, isThreeTransfers]);

  const onClickAll = () => {
    dispatch(setFilterAll(!isAll));

    if (!isAll) {
      dispatch(setAllFilters(true));
    } else {
      dispatch(setAllFilters(false));
    }
  };

  return (
    <form className={s.Filter}>
      <fieldset className={s.FilterFieldset}>
        <legend className={s.FilterTitle}>Количество пересадок</legend>
        <div className={s.FilterField}>
          <input
            className={s.FilterInput}
            type="checkbox"
            id="all"
            name="transfers"
            value="all"
            checked={isAll}
            onChange={onClickAll}
          />
          <div className={s.FilterCustomCheckbox} />
          <label className={s.FilterLabel} htmlFor="all">
            Все
          </label>
        </div>
        <div className={s.FilterField}>
          <input
            className={s.FilterInput}
            type="checkbox"
            id="withoutTransfers"
            name="transfers"
            value="withoutTransfers"
            checked={isWithoutTransfers}
            onChange={(e) => dispatch(setFilter(e.target.defaultValue))}
          />
          <div className={s.FilterCustomCheckbox} />
          <label className={s.FilterLabel} htmlFor="withoutTransfers">
            Без пересадок
          </label>
        </div>
        <div className={s.FilterField}>
          <input
            className={s.FilterInput}
            type="checkbox"
            id="oneTransfer"
            name="transfers"
            value="oneTransfer"
            checked={isOneTransfer}
            onChange={(e) => dispatch(setFilter(e.target.defaultValue))}
          />
          <div className={s.FilterCustomCheckbox} />
          <label className={s.FilterLabel} htmlFor="oneTransfer">
            1 пересадка
          </label>
        </div>
        <div className={s.FilterField}>
          <input
            className={s.FilterInput}
            type="checkbox"
            id="twoTransfers"
            name="transfers"
            value="twoTransfers"
            checked={isTwoTransfers}
            onChange={(e) => dispatch(setFilter(e.target.defaultValue))}
          />
          <div className={s.FilterCustomCheckbox} />
          <label className={s.FilterLabel} htmlFor="twoTransfers">
            2 пересадка
          </label>
        </div>
        <div className={s.FilterField}>
          <input
            className={s.FilterInput}
            type="checkbox"
            id="threeTransfers"
            name="transfers"
            value="threeTransfers"
            checked={isThreeTransfers}
            onChange={(e) => dispatch(setFilter(e.target.defaultValue))}
          />
          <div className={s.FilterCustomCheckbox} />
          <label className={s.FilterLabel} htmlFor="threeTransfers">
            3 пересадка
          </label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
