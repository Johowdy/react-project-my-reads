import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {

  render() {
    const { title, shelf, books, bookChangeShelf } = this.props
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter(b=>b.shelf===shelf).map(book => {
                return (<Book key={book.id} book={book}
                  bookChangeShelf={bookChangeShelf}/>)
              })}
            </ol>
          </div>
        </div>
    )
  }
}

export default Bookshelf
