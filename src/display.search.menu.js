import { genres, authors } from "./data.js"

// SELECTORS
const searchMenu = document.querySelector('[data-search-overlay]')
const searchMenuButton = document.querySelector('[data-header-search]')
const searchCancel = document.querySelector('[data-search-cancel]')
const genreOptions = document.querySelector('[data-search-genres]')
const authorOptions = document.querySelector('[data-search-authors]')

// STATE

// ON MOUNT
const genresFragment = document.createDocumentFragment()
const genreOption = document.createElement('option')
genreOption.value = 'any'
genreOption.innerText = 'All Genres'
genresFragment.appendChild(genreOption)

for (const genre in genres) {
    const genreOption = document.createElement('option')
    genreOption.value = genres[genre]
    genreOption.innerText = genres[genre]
    genresFragment.appendChild(genreOption)
}

genreOptions.appendChild(genresFragment)


const authorsFragment = document.createDocumentFragment()
const authorOption = document.createElement('option')
authorOption.value = 'any'
authorOption.innerText = 'All Authors'
authorsFragment.appendChild(authorOption)

for (const author in authors) {
    const authorOption = document.createElement('option')
    authorOption.value = authors[author]
    authorOption.innerText = authors[author]
    authorsFragment.appendChild(authorOption)
}

authorOptions.appendChild(authorsFragment)

// HANDLERS
// EVENTLISTENERS
searchMenuButton.addEventListener('click', () => {searchMenu.showModal()})
searchCancel.addEventListener('click', () => {searchMenu.close()})