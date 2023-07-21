// import some data from local libraries and assign local variables
const accountsLib = require("../data/accounts.js")
const booksLib = require("../data/books.js")
const authorsLib = require("../data/authors.js")
const accounts = accountsLib.accounts
const books = booksLib.books
const authors = authorsLib.authors

function findAccountById(accounts, id) {
  const search = accounts.find((match) => match.id === id)
  return search
}

function sortAccountsByLastName(accounts) {
  let sorted = accounts.sort((lastNameA, lastNameB) => lastNameA.name.last > lastNameB.name.last ? 1 : -1)
  return sorted
}

function getTotalNumberOfBorrows(account, books) {
  const borrows = books.map((book) => 
  book.borrows.filter((borrow) => borrow.id === account.id)).flat()
  return borrows.length
} 


function getBooksPossessedByAccount(account, books, authors) {
  let borrowed = []
  let id = account.id
  for (let i in books) {
    const thisBookBorrowed = books[i].borrows
    for (let j in thisBookBorrowed) {
      if (thisBookBorrowed[j].id === id) {
        if (thisBookBorrowed[j].returned === false){
          borrowed.push(books[i])
        }
      }
    }
  }
  for (let i in borrowed) {
    const thisBook = borrowed[i]
    const authId = borrowed[i].authorId
    let authorById = authors.find((author) => author.id === authId)
    thisBook["author"] = authorById
  }
  return borrowed
} 
const variable = getBooksPossessedByAccount("5f446f2e6059326d9feb9a68", books, authors)
console.log(variable)
console.log("hello world")
//let accessBookObject = books[0]
//accessBookObject["author"] = authors[0]



/*
  [
    {
      id: "5f447132320b4bc16f950076",
      title: "est voluptate nisi",
      genre: "Classics",
      authorId: 12,
      author: {
        id: 12,
        name: {
          first: "Chrystal",
          last: "Lester",
        },
      },
      borrows: [
        {
          id: "5f446f2e6059326d9feb9a68",
          returned: false,
        },
        ...
      ],
    },
  ]
*/

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
