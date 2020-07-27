import React, { Component } from 'react';
import styles from './LibraryPage.module.css';
import {
  getReadedBooks,
  getReadingBooks,
  getAllBooksInLibrary,
  getPlannedBooks,
} from '../../redux/books/booksSelectors';
import { getBooksAction } from '../../redux/books/booksActions';
import { toggleShowBookReviewModalAction } from '../../redux/modal/modalActions';
//Components
import LibraryList from '../../components/Library/LibraryList/LibraryList';
import LibraryTitle from '../../components/Library/LibraryTitle/LibraryTitle';
import AddBookForm from '../../components/Library/AddBookForm/AddBookForm';
import EmptyList from '../../components/Library/EmptyList/EmptyList';
import LibraryListModal from '../../components/Library/LibraryList-modal/LibraryList-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class LibraryPage extends Component {
  state = {
    choosenBookId: null,
  };

  componentDidMount() {
    this.props.getAllBooks();
  }

  handleModalChange = toggle => {
    this.setState({ modal: toggle });
  };

  getBookId = id => {
    this.setIdToModal(id);
  };

  // setIdToModal = id => {
  //   console.log(id);
  // };

  handleClickResume = id => {
    this.props.toggleBookReviewModal();
    this.setState({ choosenBookId: id });
  };

  render() {
    const {
      books,
      readBooks,
      readingBooks,
      plannedBooks,
      isBookReviewModalOpen,
    } = this.props;

    // const readBooks = [
    //   {
    //     id: 1,
    //     title: 'test',
    //     author: 'test',
    //     year: 2000,
    //     pagesCount: 200,
    //     rating: 4,
    //     comment: '',
    //   },
    //   {
    //     id: 2,
    //     title: 'test1',
    //     author: 'test1',
    //     year: 2000,
    //     pagesCount: 200,
    //     rating: 3,
    //     comment: 'bad',
    //   },
    // ];

    const { choosenBookId } = this.state;
    const { isLoading } = this.props;
    return (
      <>
        {isLoading ? (
          <Loader
            className={styles.loader}
            type="Oval"
            color="#ff6b09"
            height={100}
            width={100}
            timeout={3000}
          />
        ) : (
          <>
            <div>
              <div className={styles.wrapper}>
                {books.length === 0 && <EmptyList />}
                <AddBookForm />
                {readBooks.length > 0 && (
                  <div className={styles.marginBottom}>
                    <LibraryTitle title={'Прочитано'} isReadBooks={true} />
                    <LibraryList
                      isReadBooks={true}
                      books={readBooks}
                      onClickResume={this.handleClickResume}
                    />
                  </div>
                )}

                {readingBooks.length > 0 && (
                  <div className={styles.marginBottom}>
                    <LibraryTitle title={'Читаю'} isReadBooks={false} />
                    <LibraryList books={readingBooks} />
                  </div>
                )}

                {plannedBooks.length > 0 && (
                  <>
                    <div className={styles.marginBottom}>
                      <LibraryTitle
                        title={'Маю намір прочитати'}
                        isReadBooks={false}
                      />
                      <LibraryList
                        books={plannedBooks}
                        onClickResume={this.handleClickResume}
                      />
                    </div>
                    <Link to="/training" className={styles.button}>
                      Перейти до тренування
                    </Link>
                  </>
                )}
              </div>
            </div>

            {isBookReviewModalOpen && (
              <LibraryListModal bookId={choosenBookId} />
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  books: getAllBooksInLibrary(state),
  readBooks: getReadedBooks(state),
  readingBooks: getReadingBooks(state),
  plannedBooks: getPlannedBooks(state),
  isBookReviewModalOpen: state.modals.isShowBookReviewModal,
});

const mapDispathToProps = dispatch => ({
  getAllBooks: () => dispatch(getBooksAction()),
  toggleBookReviewModal: () => dispatch(toggleShowBookReviewModalAction()),
});

export default connect(mapStateToProps, mapDispathToProps)(LibraryPage);
