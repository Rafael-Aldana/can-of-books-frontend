import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';


// If you forget to put VALUE onto the end of the parameters, you're gonna have a bad time. It throws a JSON Circular error
class UpdateBookForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let bookToUpdate = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }
    console.log('UPDATED BOOK: ', bookToUpdate);
    this.props.updateBooks(bookToUpdate);
  }
  render() {
    return (
      <>
        <Container className="mt-5">
          <Form onSubmit={this.handleSubmit}>
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
            <Button type="submit" variant="success">Update a book</Button>
          </Form>
        </Container>
      </>
    )
  }
}
export default UpdateBookForm;