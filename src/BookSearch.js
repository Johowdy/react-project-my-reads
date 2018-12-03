import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
  state = {
    query: '',
    booksToShow: []
  }

  updateResults() {
    const search = this.state.query
    const { books } = this.props
    if (search && search.length) {
      BooksAPI.search(search).then(results => {
        const newBooks = results.error ? [] : results
        this.setState({
          booksToShow: newBooks.map(newBook => {
            const existingBook = books.find(b => b.id === newBook.id)
            if (existingBook) {
              newBook.shelf = existingBook.shelf
            } else {
              newBook.shelf = 'none'
            }
            return newBook
          })
        })
      }).catch(err => {
        return this.setState({booksToShow: []})
      })
    } else {
      return this.setState({booksToShow: []})
    }
  }

  updateQuery = search => {
    this.setState({
      query: search
    }, this.updateResults)
  }

  render() {
    const { addBook } = this.props
    const { query, booksToShow } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={query} onChange={event => this.updateQuery(event.target.value)}/>
          </div>
        </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {booksToShow.map(book => {
                return (
                  <Book key={book.id} book={book}
                    bookChangeShelf={addBook}
                  />
                )
              })}
            </ol>
          </div>
      </div>
    )
  }
}

export default BookSearch
