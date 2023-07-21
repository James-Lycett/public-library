// import some data from local libraries and assign local variables
const accountsLib = require("../data/accounts.js")
const booksLib = require("../data/books.js")
const authorsLib = require("../data/authors.js")
const accounts = accountsLib.accounts
const books = booksLib.books
const authors = authorsLib.authors

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const outOfStock = books.filter((book) => book.borrows[0].returned === false)
  return outOfStock.length
}

function pushNameCountObject(name, count, array) {
  let object = {"name": name, "count": count}
  array.push(object)
}

function getMostCommonGenres(books) {
  const genres = books.reduce((result, book) => {
    let genre = book.genre
    if (result.hasOwnProperty(genre)) {
      result[genre] += 1
    }
    else {
      result[genre] = 1
    }
    return result
  }, {})
  const sortable = Object.fromEntries(
    Object.entries(genres).sort(([,a],[,b]) => b-a)
  )
  const keys = Object.keys(sortable)
  const values = Object.values(sortable)
  let result = []
  for (let i in keys) {
    pushNameCountObject(keys[i], values[i], result)
  }
  return result.slice(0, 5)
}

function getMostPopularBooks(books) {
  let result = []
  const sortByBorrows = books.sort((bookA, bookB) => bookA.borrows.length < bookB.borrows.length ? 1 : -1)
  const firstFive = sortByBorrows.slice(0, 5)
  for (let i in firstFive) {
    pushNameCountObject(firstFive[i].title, firstFive[i].borrows.length, result)
  }
  return result
}

function getMostPopularAuthors(books, authors) {
  let result = []
  for (let i in authors) {
    let booksBy = books.filter((book) => book.authorId === authors[i].id)
    let borrowAmount = booksBy.map((book) => book.borrows.length)
    let initialValue = 0
    const sum = borrowAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue, initialValue
    )
    let name = `${authors[i].name.first} ${authors[i].name.last}`
    pushNameCountObject(name, sum, result)
  }
  return result.sort((authorA, authorB) => authorA.count < authorB.count ? 1 : -1).slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
