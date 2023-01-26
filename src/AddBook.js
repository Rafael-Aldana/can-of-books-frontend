import { Component } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import UpdateBookForm from './UpdateBookForm';


class AddBook extends Component {
  render() {
    return (
      <Container>
        <ListGroup>
          {this.props.books.map(book => (
            <addBooks book={book} addBook={this.props.addBook}  updateBooks={this.props.updateBooks}/>
          ))}
        </ListGroup>
      </Container>
    )
  }
}

class addBooks extends Component {
  constructor(props){
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }
  render() {
    return (
      <>

      <ListGroup.Item>
        {this.props.book.title} is {this.props.book.description} book
        {/* <Button onclick={() => {this.props.addBook(this.props.book._id) }}>Add</Button> */}
        <Button variant="info" onClick={()=>{this.setState({ showUpdateForm: true})}} >Update</Button>
      </ListGroup.Item>
      {
        this.state.showUpdateForm && 
        <UpdateBookForm
        book={this.props.book}
        updateBooks={this.props.updateBooks}
        />
      }
      </>
    )
  }
}

export default AddBook;