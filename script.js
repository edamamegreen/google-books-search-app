let searchBooksButton = document.getElementById('search-books-button')
searchBooksButton.addEventListener('click', searchBooksButtonClickHandler, false)

function createTitle(t, l) {
    const title = document.createElement('h2')
    const link = document.createElement('a')
    link.setAttribute('href', l)
    link.textContent = t
    title.appendChild(link)
    return title
}

function createAuthorList(authors) {
    const auths = document.createElement('p')
    auths.setAttribute('class', 'authors')
    auths.textContent = `Author(s): ${authors.join(', ').replace(/(.*),$/, '')}`
    return auths
}

function createPublisher(publisher) {
    const pub = document.createElement('p')
    pub.textContent = `Publisher: ${publisher}`
    return pub
}

function createDescription(d = "No description available.") {
    const desc = document.createElement('p')
    d = d.substring(0, 300)
    desc.textContent = `${d}...`
    return desc
}

function createBookEntry(book) {
    if (book.volumeInfo.title != null) {
        const b = document.createElement('div')
        b.setAttribute('class', 'book')
        b.appendChild(createTitle(book.volumeInfo.title, book.volumeInfo.previewLink))
        if (book.volumeInfo.authors != null) {
            b.appendChild(createAuthorList(book.volumeInfo.authors))
        }
        if (book.volumeInfo.publisher != null) {
            b.appendChild(createPublisher(book.volumeInfo.publisher))
        }
        b.appendChild(createDescription(book.volumeInfo.description))
        return b
    }
}

function createBooks(bookList = []) {
    const el = document.createElement('div')
    bookList.forEach(book => el.appendChild(createBookEntry(book)))
    console.log(bookList)
    return el
}

function createStatus(msg) {
    const el = document.createElement('div')
    el.textContent = msg
    return el
}

function updateDisplay(newContent) {
    const results = document.getElementById('results')
    while(results.firstChild) {
        results.removeChild(results.firstChild)
    }
    results.appendChild(newContent)
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
        .then(data => updateDisplay(createBooks(data.items)))
        .catch(err => {
            updateDisplay(createStatus("Sorry, we're having trouble finding books for this search. Give it another try in a minute or ask Nicki about this."))
            console.log('Sorry, there was an error fulfilling your request. ' + err.name + ": " + err.message)
        })
}

getBooks('')

