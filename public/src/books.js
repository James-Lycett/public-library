// import some data from local libraries and assign local variables
const accountsLib = require("../data/accounts.js")
const booksLib = require("../data/books.js")
const authorsLib = require("../data/authors.js")
const accounts = accountsLib.accounts
const books = booksLib.books
const authors = authorsLib.authors


function findAuthorById(authors, id) {
  const match = authors.find((author) => author.id === id)
  return match
}

function findBookById(books, id) {
  const match = books.find((book) => book.id === id)
  return match
}

function partitionBooksByBorrowedStatus(books) {
  const inStock = books.filter((book) => book.borrows[0].returned === true)
  const outOfStock = books.filter((book) => book.borrows[0].returned === false)
  const result = [outOfStock, inStock]
  return result
}

function getBorrowersForBook(book, accounts) {
  const borrowIds = book.borrows.map((borrow) => borrow.id)
  const borrows = book.borrows
  const matchingAccounts = accounts.filter((account) => borrowIds.includes(account.id))
  matchingAccounts.forEach((account) => {
    const transaction = borrows.find((trans) => trans.id === account.id)
    account["returned"] = transaction.returned
  })
  const final = matchingAccounts.slice(0, 10)
  return final
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
