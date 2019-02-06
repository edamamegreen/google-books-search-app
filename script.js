let searchBooksButton = document.getElementById('search-books-button')
searchBooksButton.addEventListener('click', searchBooksButtonClickHandler, false)

function createImg(url = "") {
    const image = document.createElement('img')
    image.setAttribute('src', url)
    image.setAttribute('alt', "Image of the book cover.")
    return image
}

function createTitle(t, l) {
    const title = document.createElement('h2')
    const link = document.createElement('a')
    link.setAttribute('href', l)
    link.innerHTML = t
    title.appendChild(link)
    return title
}

function createAuthorList(authors = '') {
    const auths = document.createElement('p')
    auths.setAttribute('class', 'authors')
    auths.innerHTML = `Author(s): ${authors.join(', ').replace(/(.*),$/, '')}`
    return auths
}

function createPublisher(publisher = '') {
    const pub = document.createElement('p')
    pub.innerHTML = `Publisher: ${publisher}`
    return pub
}

function createDescription(d = 'No description available.') {
    const desc = document.createElement('p')
    d = d.substring(0, 300)
    desc.innerHTML = `${d}...`
    return desc
}

function createBookEntry(book) {
    if ('title' in book.volumeInfo) {
        const b = document.createElement('div')
        const img = document.createElement('div')
        const details = document.createElement('div')

        b.setAttribute('class', 'book')
        img.setAttribute('class', 'book-image')
        details.setAttribute('class', 'book-details')

        if ('imageLinks' in book.volumeInfo) {
            img.appendChild(createImg(book.volumeInfo.imageLinks.smallThumbnail))
        }
        details.appendChild(createTitle(book.volumeInfo.title, book.volumeInfo.previewLink))
        details.appendChild(createAuthorList(book.volumeInfo.authors))
        details.appendChild(createPublisher(book.volumeInfo.publisher))
        details.appendChild(createDescription(book.volumeInfo.description))

        b.appendChild(img)
        b.appendChild(details)
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

function searchBooksButtonClickHandler() {
    const query = document.getElementById('search-field').value
    getBooks(query)
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                throw Error(`Request rejected with status ${response.status}`)
            }
        })
        .then(data => updateDisplay(createBooks(data.items)))
        .catch(err => {
            updateDisplay(createStatus('Sorry, we\'re having trouble finding books for this search. Give it another try in a minute or ask Nicki about this.'))
            console.log(`Sorry, there was an error fulfilling your request. ${err.name}: ${err.message}`)
        })
}

////////////////// Tests //////////////////

const testBook = new Object()
testBook.volumeInfo = new Object()
testBook.volumeInfo.title = 'Some title'

const testDesc = createDescription(testBook.description)
if (testDesc.innerText
    === 'No description available.'
) throw Error('Check failed: Null book description doesn\'t create default paragraph.')