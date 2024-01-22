import { authors, books, genres } from "./data.js";
import { createPreview } from "./components/preview.js";

// SELECTORS
const listItems = document.querySelector('[data-list-items]')
const message = document.querySelector('[data-list-message]')
const showMoreButton  = document.querySelector('[data-list-button]')

const searchMenu = document.querySelector('[data-search-overlay]')
const searchData = document.querySelector('[data-search-form]')
const searchButton = document.querySelector('[data-search-overlay] [type="submit"]')


// STATE
const BOOKS_PER_PAGE = 36

let source = books
let page = 1
let range = [0, BOOKS_PER_PAGE]
let extracted = source.slice(range[0], range[1])


// ON MOUNT
if (!source && !Array.isArray(source)) throw new Error('Source required')
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

function updateRemaining() {
    const initial = source.length - (page * BOOKS_PER_PAGE)
    const remaining = initial > 0 ? initial : 0
    showMoreButton.disabled = initial < 0

    showMoreButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `
}

const previewFragment = document.createDocumentFragment()
for (const book of extracted) {
    const preview = createPreview(book)
    previewFragment.appendChild(preview)
}
listItems.appendChild(previewFragment);

updateRemaining()


// HANLERS
const showMoreHandler = () => {
    page++
    range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]
    extracted = source.slice(range[0], range[1])

    const previewFragment = document.createDocumentFragment()

    for (const book of extracted) {
        const preview = createPreview(book)
        previewFragment.appendChild(preview)
    }
    listItems.appendChild(previewFragment);

    updateRemaining()
    showMoreButton.disabled = !(source.length - (page * BOOKS_PER_PAGE) > 0)
}

const searchHandler = (event) => {
    event.preventDefault()

    const formData = new FormData(searchData)
    const filters = Object.fromEntries(formData)

    let result = []

    for (const book of books) {

        let titleMatch = filters.title.trim() === ''
        let authorMatch = filters.author === 'any'
        let genreMatch = filters.genre === 'any'

        if (titleMatch && authorMatch && genreMatch) {
            result.push(book)

        } else {
            titleMatch = book.title.toLowerCase().includes(filters.title.toLowerCase())
            authorMatch = filters.author === 'any' || filters.author === authors[book.author]

            if (!genreMatch) {
                for (const genre of book.genres) {
                    genreMatch = filters.genre === genres[genre]
                    if (genreMatch) break
                }
            }
            
            if (titleMatch && authorMatch && genreMatch) {
                result.push(book)
            }
        }

    }

    result.length < 1 ? message.classList.add('show') : message.classList.remove('show')

    listItems.innerHTML = ''
    source = result
    page = 1
    range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]
    extracted = source.slice(range[0], range[1])

    const previewFragment = document.createDocumentFragment()
    for (const book of extracted) {
        const preview = createPreview(book)
        previewFragment.appendChild(preview)
    }
    listItems.appendChild(previewFragment);

    updateRemaining()
    searchMenu.close()
    window.scrollTo({ top: 0, behavior: 'smooth' })
}


// EVENTHANDLERS
showMoreButton.addEventListener('click', showMoreHandler)
searchButton.addEventListener('click', searchHandler)