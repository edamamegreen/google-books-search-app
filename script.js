let queryButton = document.getElementById("querybutton")

queryButton.addEventListener("click", runQuery, false)

function updateDisplay(content = []) {
    let bookList = content
    bookList.forEach(book => {
        const abook = document.createElement('div')
        const title = document.createElement('p')
        title.setAttribute('class', 'title')
        title.textContent = book.volumeInfo.title
        abook.appendChild(title)

        const body = document.createElement('p')
        book.volumeInfo.description = book.volumeInfo.description.substring(0, 300)
        body.textContent = `${book.volumeInfo.description}...`
        abook.appendChild(body)

        const base = document.getElementById('root')
        base.appendChild(abook)

        console.log(bookList)
    })
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

