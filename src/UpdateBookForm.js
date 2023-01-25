import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

class UpdateBookForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let bookToUpdate = {
      title: event.target.title,
      description: event.target.description,
      status: event.target.status,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }
    console.log('UPDATED BOOK: ', bookToUpdate);
    this.props.handleUpdateBook(bookToUpdate);
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