import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import test from './bookIMG.jpg'

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

  deleteBooks = async (id) => {
    let url = `{process.env.REACT_APP_SERVER}/books/${id}`

    await axios.delete(url);
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
      </>
    )
  }
}

export default BestBooks;
