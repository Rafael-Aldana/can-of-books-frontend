import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import img from './bookIMG.jpg'
import {Button} from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import UpdateBookForm from './UpdateBookForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      showUpdateForm: false

    }
  }

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  };
  handleShow = () => {
    this.setState({
      showModal: true,
    });
  }
handleCloseUpdate = () => {
  this.setState({
    showUpdateForm: false,
  })
}


  handleShowUpdate = () => {
    this.setState({
      showUpdateForm: true,
    });
  }

  getBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books`;
      let bookData = await axios.get(url);
      this.setState({
        books: bookData.data
      });

    }
    catch (error) {
      console.log(error.response);
    }
  }

  deleteBooks = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks,
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  handleBookSubmit = (event) => {
    event.preventDefault();

    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value
    }
    console.log('New Book from form ->', newBook);
    this.postBook(newBook);
    this.handleClose();
  }

  postBook = async (bookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books`;
      let createdBook = await axios.post(url, bookObj);
      this.setState({
        books: [...this.state.books, createdBook.data]
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  // ********* 
  updateBooks = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(url, bookToUpdate);
      console.log(updatedBook)
      let updatedBookArray = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
        ? updatedBook.data
        : existingBook
      });
      this.setState({
        books: updatedBookArray
      })
      this.handleCloseUpdate();

    } catch (error) {
      console.log(error.message);
    } 
  }

  componentDidMount() {
    this.getBooks();
  }


  render() {

    /* TODO: render all the books in a Carousel */
    // Carousel syntax taken from in class code review
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.books.length ? (
          <Carousel >

            {this.state.books.map((book, index) => {
              return (
                <Carousel.Item key={book.title + index}>
                  <img src={img} alt="books" />
                  <p>{book.title}</p>
                  <p>{book.description}</p>
                  {book.status ? (
                    <p>This book is available</p>
                  ) : (
                    <p>This book is not available</p>
                  )}
                  <Carousel.Caption>
                    <Button onClick={() => { this.deleteBooks(book._id) }} variant="danger"> Delete a Book</Button>
                    <Button onClick={() => { this.handleShowUpdate()}} variant="info">Update</Button>
                    {this.state.showUpdateForm && 
                    <UpdateBookForm show={this.state.showUpdateForm} book={book} updateBooks={this.updateBooks} />}
                  </Carousel.Caption>



                </Carousel.Item>
              )
            })}
          </Carousel>
        ) : (
          <h3>No Books Found</h3>
        )}
        <Button variant="secondary" onClick={this.handleShow}>Add a Book</Button>

        <BookFormModal show={this.state.showModal} handleClose={this.handleClose} handleBookSubmit={this.handleBookSubmit} />
      </>
    )
  }
}

export default BestBooks;
