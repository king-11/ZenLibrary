const axios = require('axios')
const fs = require('fs')
const path = require('path')
const Fuse = require('fuse.js')

const books = JSON.parse(fs.readFileSync(path.join(__dirname, './data.json'), { encoding: 'utf8' }))

let fillIt = []

async function getCall(bookName, author) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`;
    try {
        // sleep(1000)
        const getReq = await axios.get(url)
        const options = {
            includeScore: true,
            keys: [
                "volumeInfo.authors"
            ],
            minMatchCharLength: 5
        }

        const fuse = new Fuse(getReq.data.items, options)
        let data = fuse.search(author)
        data = data.sort((a, b) => b.score - a.score)
        data = data.map(({ item }) => {
            return {
                description: item.volumeInfo?.description || item.searchInfo?.textSnippet,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors,
                categories: item.volumeInfo.categories,
                rating: item.volumeInfo.averageRating,
                images: item.volumeInfo.imageLinks,
                industryIdentifiers: item.volumeInfo.industryIdentifiers,
            }
        })
        if (data.length !== 0) {
            console.log(bookName)
            fillIt.push(data[0])
        }
        else {
            console.log("none");
        }
    } catch (e) {
        console.error(e);
    }

}

books.forEach(async ({ title, author }) => {
    await getCall(title, author)
    // console.log(fillIt.length)
    fs.writeFileSync(path.join(__dirname, 'books.json'), JSON.stringify(fillIt))
});
