
var request = new XMLHttpRequest();

request.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=harry+potter', true);


request.onload = function () {
    var data = JSON.parse(this.response);
    var dataList = data.items;

    if (request.status >= 200 && request.status < 400) {
        dataList.forEach(book => {

            const abook = document.createElement('div');

            const title = document.createElement('p');
            title.setAttribute('class', 'title');
            title.textContent = book.volumeInfo.title;
            abook.appendChild(title);

            const body = document.createElement('p');
            book.volumeInfo.description = book.volumeInfo.description.substring(0, 300);
            body.textContent = `${book.volumeInfo.description}...`;
            abook.appendChild(body);

            const base = document.getElementById('root');
            base.appendChild(abook);

            console.log(dataList);
        });
    } else {
        console.log('Sorry, there\'s and error.');
    }
}

request.send();