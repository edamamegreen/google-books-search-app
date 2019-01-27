let searchBooksButton = document.getElementById('search-books')
searchBooksButton.addEventListener('click', searchBooks, false)

function createTitle(t) {
    const title = document.createElement('h2')
    title.textContent = t
    return title
}

function createDescription(d) {
    const desc = document.createElement('p')
    d = d.substring(0, 300)
    desc.textContent = `${d}...`
    return desc
}

function createBookEntry(book) {
    const base = document.getElementById('root')
    const b = document.createElement('div')
    b.appendChild(createTitle(book.volumeInfo.title))
    b.appendChild(createDescription(book.volumeInfo.description))
    base.appendChild(b)
}

function updateDisplay(content = []) {
    let bookList = content
    bookList.forEach(book => createBookEntry(book))
    console.log(bookList)
}

function getBooks(q) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + q

    // TODO: when there is no description, prevent error and display default text
    fetch(url)
        .then(response => response.json())
        .then(data => updateDisplay(data.items))
        .catch(err => console.log('Sorry, there was an error fetching this data. ' + err.message))
}

function searchBooks(e) {
    const query = document.getElementById('search').value
    getBooks(query)
}

getBooks('')

