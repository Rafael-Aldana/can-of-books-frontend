import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  getBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_API_SERVER}/books`;
      let bookData = await axios.get(url);
      this.setState({ books: bookData.data });

    }
    catch (err) {
      console.log(err);
    }
  }

componentDidMount(){
  this.getBooks();
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
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
