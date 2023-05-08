import { books, genres, authors, BOOKS_PER_PAGE} from "./data.js";

/* GLOBAL VARIABLES */
let matches = books
let page = 1;
const amountPages = Math.ceil(matches.length / BOOKS_PER_PAGE)
const lastPage = matches.length % BOOKS_PER_PAGE

let range = {
    start : (page - 1) * BOOKS_PER_PAGE,
    end : BOOKS_PER_PAGE * page
}

let extracted = matches.slice(range.start, range.end)
let initial
let hasRemaining

const css = {
    night : {
        dark: '255, 255, 255',
        light: '10, 10, 20'
    },
    day : {
        dark: '10, 10, 20',
        light: '255, 255, 255'
    }
}

/* FUNCTIONS */

const createPreview = (props) => {
    const {author, id, image, title} = props

    const element = document.createElement("button");
    element.classList.add("preview");
    element.dataset.preview = id;
    element.innerHTML = /* html */ `
    <img 
        class="preview__image" 
        src="${image}" 
    />
    
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
    `;

    return element
};

const updateRemaining = () => {
    initial = matches.length - (BOOKS_PER_PAGE * page)
    hasRemaining = initial > 0 ? initial : 0
    if (hasRemaining === 0) {
        showMoreButton.disabled = true
    }
}

const showMore = (event) => {
    event.preventDefault()
    page += 1

    range = {
        start : (page - 1) * BOOKS_PER_PAGE,
        end : BOOKS_PER_PAGE * page
    }

    extracted = matches.slice(range.start, range.end)

    updateRemaining()

    if (hasRemaining > 0) {
        for (const booksIndex of extracted) {
            const preview = createPreview(booksIndex)
            previewFragment.appendChild(preview)
        }
        
        listBooks.appendChild(previewFragment);
        
        const previewList = document.querySelectorAll('.preview')
        const previewArray = Array.from(previewList)
        for (const preview of previewArray) {
            preview.addEventListener('click', activePreview)
        }
    }
    
    showMoreButton.innerHTML = /* html */ `
    <span>Show more </span>
    <span class="list__remaining">
        (${hasRemaining})
    </span>
    `; 
};

const showSearchMenu = (event) => {
    event.preventDefault()
    searchMenu.showModal()
}

const cancelSearch = (event) => {
    event.preventDefault()
    searchMenu.close()
}

const filter = (event) => { 
    event.preventDefault()
    const formData = new FormData(searchData)
    const filters = Object.fromEntries(formData)
    filters.title.trim()
    let result = []

    for (const book of books) {
        let titleMatch = true
        let authorMatch = true
        let genreMatch = true

        if (filters.title !== '') {
            titleMatch = book.title.toLowerCase().includes(filters.title.toLowerCase())
        }

        if (filters.author !== 'any') {
            authorMatch = authors[book.author].includes(filters.author)
        }

        if ( filters.genre !== 'any') {
            for (const singleGenre of book.genres) {
                genreMatch = genres[singleGenre].includes(filters.genre)
            }
        }

        if (titleMatch && authorMatch && genreMatch) {
            result.push(book)
        } 

    }

    matches = result

    if (result.length < 1) {
        console.log('No results found. Your filters might be too narrow.');
        listMessage.classList.add('list__message_show');
    } else {
        listMessage.classList.remove('list__message_show')
    }
    

    listBooks.innerHTML = ''
    extracted = matches.slice(range.start, range.end)

    const previewFragment = document.createDocumentFragment()
    for (const booksIndex of extracted) {
        const preview = createPreview(booksIndex)
        previewFragment.appendChild(preview)
    }
    listBooks.appendChild(previewFragment);

    const previewList = document.querySelectorAll('.preview')
    const previewArray = Array.from(previewList)
    for (const preview of previewArray) {
        preview.addEventListener('click', activePreview)
    }

    updateRemaining()
    showMoreButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${hasRemaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' })
    searchMenu.close()
}

const showSettings = (event) => {
    event.preventDefault()
    settingsMenu.showModal()
}

const cancelSettings = (event) => {
    event.preventDefault()
    settingsMenu.close()
}

const saveTheme = (event) => { 
    event.preventDefault()
    const formData = new FormData(settingsData)
    const result = Object.fromEntries(formData)

    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    
    settingsMenu.close()
}

const activePreview = (event) => {
    event.preventDefault()
    let active

    const bookPreview = event.target.closest('.preview')
    const bookPreviewId = bookPreview.getAttribute('data-preview');
    
    for (const book of books) {
        if (active) break

        if (book.id === bookPreviewId) {
            active = book
        }
    }

    if (!active) return

    const { title, image, description, published, author } = active
    summary.showModal()
    summaryBackground.src = image
    summaryImage.src = image
    summaryTitle.innerText = title
    summarySubtitle.innerText = `${authors[author]} (${new Date(published).getFullYear()})`
    summaryDescription.innerText = description
    
    summaryClose.addEventListener('click', () => {
        summary.close()
    })
}

/* REFERENCES */

const listBooks = document.querySelector('[data-list-items]')
const listMessage = document.querySelector('[data-list-message]')
const showMoreButton  = document.querySelector('[data-list-button]')

const summary = document.querySelector('[data-list-active]')
const summaryBackground = document.querySelector('[data-list-blur]')
const summaryImage = document.querySelector('[data-list-image]')
const summaryTitle = document.querySelector('[data-list-title]')
const summarySubtitle = document.querySelector('[data-list-subtitle]')
const summaryDescription = document.querySelector('[data-list-description]')
const summaryClose = document.querySelector('[data-list-close]')

const searchMenuButton = document.querySelector('[data-header-search]')
const searchMenu = document.querySelector('[data-search-overlay]')
const searchCancel = document.querySelector('[data-search-cancel]')
const searchData = document.querySelector('[data-search-form]')
const searchTitles = document.querySelector('[data-search-title]')
const searchGenres = document.querySelector('[data-search-genres]')
const searchAuthors = document.querySelector('[data-search-authors]')
const searchButton = document.querySelector('[data-search-overlay] [type="submit"]')

const settingsButton = document.querySelector('[data-header-settings]')
const settingsMenu = document.querySelector('[data-settings-overlay]')
const settingsData = document.querySelector('[data-settings-form]')
const settingsTheme = document.querySelector('[data-settings-theme]')
const settingsCancel = document.querySelector('[data-settings-cancel]')
const settingsSave = document.querySelector('[data-settings-overlay] [type="submit"]')

/* LOGIC */

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

const previewFragment = document.createDocumentFragment()
for (const booksIndex of extracted) {
    const preview = createPreview(booksIndex)
    previewFragment.appendChild(preview)
}
listBooks.appendChild(previewFragment);

const genresFragment = document.createDocumentFragment()
const genresOption = document.createElement('option')
genresOption.value = 'any'
genresOption.innerText = 'All Genres'
genresFragment.appendChild(genresOption)

for (const genre in genres) {
    const genresOption = document.createElement('option')
    genresOption.value = genres[genre]
    genresOption.innerText = genres[genre]
    genresFragment.appendChild(genresOption)
}
searchGenres.appendChild(genresFragment)

const authorsFragment = document.createDocumentFragment()
const authorsOption = document.createElement('option')
authorsOption.value = 'any'
authorsOption.innerText = 'All Authors'
authorsFragment.appendChild(authorsOption)

for (const author in authors) {
    const authorsOption = document.createElement('option')
    authorsOption.value = authors[author]
    authorsOption.innerText = authors[author]
    authorsFragment.appendChild(authorsOption)
}
searchAuthors.appendChild(authorsFragment)

settingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'day' : 'night'
let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'day' : 'night'

document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);

showMoreButton.innerHTML = /* html */ `
    Show more 
    <span class="list__remaining">
        (${hasRemaining})
    </span>
`;

const previewList = document.querySelectorAll('.preview')
const previewArray = Array.from(previewList)

/* EVENTLISTENER */

showMoreButton.addEventListener("click", showMore) 

searchMenuButton.addEventListener('click', showSearchMenu)
searchCancel.addEventListener('click', cancelSearch)
searchButton.addEventListener('click', filter)

settingsButton.addEventListener('click', showSettings)
settingsCancel.addEventListener('click', cancelSettings)
settingsSave.addEventListener('click', saveTheme) 

for (const preview of previewArray) {
    preview.addEventListener('click', activePreview)
}