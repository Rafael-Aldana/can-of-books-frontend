import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  };


  deleteBooks = async (id) => {
    let url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`

    await axios.delete(url);

    let updatedBooks = this.state.books.filter(book => book._id !== id)
    this.setState({
      books: updatedBooks
    })
  }

  




  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            <Route
              exact path="/about"
              element={<About />}
            >
            </Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
