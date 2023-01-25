import { Component } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap'


class addBook extends Component {
  render() {
    return (
      <Container>
        <ListGroup>
          {this.props.books.map(book => (
            <addBooks book={book} addBook={this.props.addBook} />
          ))}
        </ListGroup>
      </Container>
    )
  }
}

class addBooks extends Component {
  render() {
    return (
      <ListGroup.Item>
        {this.props.book.title} is {this.props.book.description} book
        <Button onclick={() => {this.props.addBook(this.props.book._id) }}>Add</Button>
      </ListGroup.Item>
    )
  }
}

export default addBook;