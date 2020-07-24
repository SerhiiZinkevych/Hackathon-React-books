import React, { Component } from 'react';
import styles from './Training.module.css';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
registerLocale('uk', uk);

class StartTraining extends Component {
  state = {
    startDate: null,
    endDate: null,
    allDay: 0,
  };

  setStartDate = date => {
    this.setState({
      startDate: date,
    });
  };

  setDayToRead = date => {
    const deltaDay = (date - this.state.startDate) / 86400000;

    this.setState({
      allDay: deltaDay,
    });
  };

  setEndDate = date => {
    this.setState({
      endDate: date,
    });
    this.setDayToRead(date);
  };

  render() {
    console.log(this.state.startDate, this.state.endDate, this.state.allDay);
    return (
      <div className={styles.startTrainingMainContainer}>
        <div className={styles.startTrainingContainer}>
          <h2 className={styles.startTitle}>Моє тренування</h2>
          <div className={styles.calendarContainer}>
            <>
              <DatePicker
                className={styles.calendarInput}
                onChange={date => this.setStartDate(date)}
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                dateFormat="dd.MM.yyyy"
                placeholderText="Початок"
                locale="uk"
              />
              <DatePicker
                className={styles.calendarInput}
                onChange={date => this.setEndDate(date)}
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                minDate={this.state.startDate}
                dateFormat="dd.MM.yyyy"
                placeholderText="Завершення"
                locale="uk"
              />
            </>
          </div>
          <form className={styles.bookSelectForm}>
            <p>
              <select className={styles.bookSelectField} name="book">
                <option>Обрати книги з бібліотеки</option>
                <option value="book1">BOOK-1</option>
                <option value="book2">BOOK-2</option>
                <option value="book3">BOOK-3</option>
              </select>
            </p>
            <p>
              <input
                className={styles.bookSelectSubmit}
                type="submit"
                value="Додати"
              />
            </p>
          </form>

          <table className={styles.selectedBookTable}>
            <thead>
              <tr>
                <th className={styles.selectedBookTableBookName}>
                  Назва книги
                </th>
                <th className={styles.selectedBookTableAuthor}>Автор</th>
                <th className={styles.selectedBookTableYear}>Рік</th>
                <th className={styles.selectedBookTablePages}>Стор.</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className={styles.selectedBookTableBookName}>
                  "Війна та мир"
                </td>
                <td className={styles.selectedBookTableAuthor}>Лев Толстий</td>
                <td className={styles.selectedBookTableYear}>1869</td>
                <td className={styles.selectedBookTablePages}>1472</td>
                <td>
                  <button className={styles.selectedBookDelete}></button>
                </td>
              </tr>
              <tr>
                <td className={styles.selectedBookTableBookName}>...</td>
              </tr>
            </tbody>
          </table>
          <Link to="/statistics" className={styles.startTrainingButton}>
            Почати тренування
          </Link>
        </div>
        <div className={styles.bookStatisticContainer}>
          <h2 className={styles.bookStatisticTitle}>Моя мета прочитати</h2>
          <div className={styles.bookStatisticCounterContainer}>
            <div className={styles.bookStatisticCounter}>0</div>
            <div className={styles.bookStatisticCounter}>
              {this.state.allDay}
            </div>
          </div>
          <div className={styles.counterLaibelConyainer}>
            <p className={styles.counterLaibel}>Кількість книжок</p>
            <p className={styles.counterLaibel}>Кількість днів</p>
          </div>
        </div>
      </div>
    );
  }
}

export default StartTraining;
