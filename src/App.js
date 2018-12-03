import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BooksList from './BooksList'
import BookSearch from './BookSearch'
import './App.css'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books: books})
    })
  }

  onChangeBookShelf = (book, newShelf) => {
    let { books } = this.state
    const existingBook = books.find(b => b.id === book.id)
    if (existingBook) {
      existingBook.shelf = newShelf
    } else {
      book.shelf = newShelf
      books = books.concat(book)
    }
    this.setState({books: books})
    BooksAPI.update(book, newShelf)
  }

  render() {
    return (
      <div className="app">
      <Route path="/search" render={() => (
        <BookSearch
          books={this.state.books}
          addBook={this.onChangeBookShelf}
        />
      )}/>
      <Route exact path="/" render={() => (
        <BooksList
          books={this.state.books}
          bookChangeShelf={this.onChangeBookShelf}
         />
      )}/>
      </div>
    )
  }
}

export default BooksApp
