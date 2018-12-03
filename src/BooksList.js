import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

class BooksList extends Component {

  render() {
    const { books, bookChangeShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title='Currently Reading'
              shelf='currentlyReading'
              books={books}
              bookChangeShelf={bookChangeShelf}
              />
            <Bookshelf
              title='Want To Read'
              shelf='wantToRead'
              books={books}
              bookChangeShelf={bookChangeShelf}
              />
            <Bookshelf
              title='Read'
              shelf='read'
              books={books}
              bookChangeShelf={bookChangeShelf}
              />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksList
