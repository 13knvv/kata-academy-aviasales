import s from './TransfersForm.module.scss';

function TransfersForm() {
  return (
    <form className={s.TransfersForm}>
      <fieldset className={s.TransfersFormFieldset} disabled={false}>
        <legend className={s.TransfersFormTitle}>Количество пересадок</legend>
        <div className={s.TransfersFormField}>
          <input className={s.TransfersFormInput} type="checkbox" id="all" name="transfers" value="All" />
          <div className={s.TransfersFormCustomCheckbox} />
          <label className={s.TransfersFormLabel} htmlFor="all">
            Все
          </label>
        </div>
        <div className={s.TransfersFormField}>
          <input className={s.TransfersFormInput} type="checkbox" id="not" name="transfers" value="All" />
          <div className={s.TransfersFormCustomCheckbox} />
          <label className={s.TransfersFormLabel} htmlFor="not">
            Без пересадок
          </label>
        </div>
        <div className={s.TransfersFormField}>
          <input className={s.TransfersFormInput} type="checkbox" id="1" name="transfers" value="All" />
          <div className={s.TransfersFormCustomCheckbox} />
          <label className={s.TransfersFormLabel} htmlFor="1">
            1 пересадка
          </label>
        </div>
        <div className={s.TransfersFormField}>
          <input className={s.TransfersFormInput} type="checkbox" id="2" name="transfers" value="All" />
          <div className={s.TransfersFormCustomCheckbox} />
          <label className={s.TransfersFormLabel} htmlFor="2">
            2 пересадка
          </label>
        </div>
        <div className={s.TransfersFormField}>
          <input className={s.TransfersFormInput} type="checkbox" id="3" name="transfers" value="All" />
          <div className={s.TransfersFormCustomCheckbox} />
          <label className={s.TransfersFormLabel} htmlFor="3">
            3 пересадка
          </label>
        </div>
      </fieldset>
    </form>
  );
}

export default TransfersForm;
