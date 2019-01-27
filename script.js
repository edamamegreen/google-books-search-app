let queryButton = document.getElementById("querybutton")

queryButton.addEventListener("click", runQuery, false)

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
    fetch(url).then(function (response) {
        return response.json()
    }).then(function (data) {
        updateDisplay(data.items)
    }).catch(function (err) {
        console.log('Sorry, there was an error fetching this data. ' + err.message)
    })
}

function runQuery(e) {
    const query = document.getElementById('query').value
    updateDisplay(getBooks(query))
}

updateDisplay(getBooks(' '))

