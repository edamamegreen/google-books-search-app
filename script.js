let searchBooksButton = document.getElementById('search-books-button')
searchBooksButton.addEventListener('click', searchBooksButtonClickHandler, false)

function createTitle(t) {
    const title = document.createElement('h2')
    title.textContent = t
    return title
}

function createDescription(d = "No description available.") {
    const desc = document.createElement('p')
    d = d.substring(0, 300)
    desc.textContent = `${d}...`
    return desc
}

function createBookEntry(book) {
    const results = document.getElementById('results')

    if (book.volumeInfo.title != null) {
        const b = document.createElement('div')
        b.setAttribute('class', 'book')
        b.appendChild(createTitle(book.volumeInfo.title))
        b.appendChild(createDescription(book.volumeInfo.description))
        results.appendChild(b)
    }
}

function updateDisplay(content = []) {
    let bookList = content
    const results = document.getElementById('results')

    while(results.firstChild) {
        results.removeChild(results.firstChild)
    }
    bookList.forEach(book => createBookEntry(book))
    console.log(bookList)
}

function getBooks(q) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + q
    return fetch(url)
}

function searchBooksButtonClickHandler(e) {
    const query = document.getElementById('search-field').value
    getBooks(query)
        .then(response => {
            console.log(response.status + " " + response.ok)
            if(response.ok) {
                return response.json()
            } else {
                throw Error('Request rejected with status ' + response.status)
            }
        })
        .then(data => updateDisplay(data.items))
        .catch(err => console.log('Sorry, there was an error fetching this data. ' + err.name + ": " + err.message))
}

getBooks('')

