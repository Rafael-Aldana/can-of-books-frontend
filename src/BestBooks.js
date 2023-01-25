import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import test from './bookIMG.jpg'
import { Container, Form, Button } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let bookData = await axios.get(url);
      this.setState({
        books: bookData.data
      });

    }
    catch (error) {
      console.log(error.response);
    }
  }

  // deleteBooks = async (id) => {
  //   try {
  //     let url = `${process.env.REACT_APP_SERVER}/books/${id}`
  //     await axios.delete(url);
  //     let updatedBooks = this.state.books.filter(book => book._id !== id);
  //     this.setState({
  //       books: updatedBooks,
  //     })

  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // handleBookSubmit = (event) => {
  //   event.preventDefault();

  //   let newBook = {
  //     title: event.target.title.value,
  //     description: event.target.description.value,
  //     status: event.target.status.value
  //   }
  //   console.log('New Book from form ->', newBook);
  //   this.postBook(newBook);
  // }

  // postBook = async (bookObj) => {
  //   try {
  //     let url = `${process.env.REACT_APP_SERVER}/books`;
  //     let createdBook = await axios.post(url, bookObj);
  //     this.setState({
  //       books: [...this.state.books, createdBook.data]
  //     })
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  componentDidMount() {
    this.getBooks();
    // this.deleteBooks();
    // this.postBook();
    // this.handleBookSubmit();
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
                <Carousel.Item>
                  <img src={test} alt="books" />
                  <p>{book.title}</p>
                  <p>{book.description}</p>
                  {book.status ? (
                    <p>This book is available</p>
                  ) : (
                    <p>This book is not available</p>
                  )}

                </Carousel.Item>
              )
            })}
          </Carousel>
        ) : (
          <h3>No Books Found</h3>
        )}
        <Container className="mt-5">
          <Form onSubmit={this.handleBookSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Check type="checkbox" label="Available" />
              <Form.Check type="checkbox" label="Unavailable" />
            </Form.Group>
            <Button type="submit">Add Book</Button>
          </Form>
        </Container>
      </>
    )
  }
}

export default BestBooks;
