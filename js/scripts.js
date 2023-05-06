import { books, genres, authors, BOOKS_PER_PAGE } from "./data.js";

const matches = books
let page = 1;

// if (!books && !Array.isArray(books)) throw new Error('Source required') 
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

// const day = {
//     dark: '10, 10, 20',
//     light: '255, 255, 255',
// }

// const night = {
//     dark: '255, 255, 255',
//     light: '10, 10, 20',
// }

const fragment = document.createDocumentFragment()
let extracted = books.slice(0, BOOKS_PER_PAGE)

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

for (const booksIndex of extracted) {
    const preview = createPreview(booksIndex)
    fragment.appendChild(preview)
}

document.querySelector("[data-list-items]").appendChild(fragment);

// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// data-search-genres.appendChild(genres)

// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors)

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);

const showmoreButton = document.querySelector('[data-list-button]')

const updateRemaining = () => {
    const remaining = books.length - (BOOKS_PER_PAGE * page)
    return remaining;
}

showmoreButton.innerHTML = /* html */ `
    Show more 
    <span class="list__remaining">
        (${updateRemaining()})
    </span>
`;

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

const showMore = (event) => {
    event.preventDefault()
    page += 1
    const remaining = updateRemaining()
    const hasRemaining = remaining > 0 ? remaining : 0

    const rangeStart = (page - 1) * BOOKS_PER_PAGE
    const rangeEnd = books.length - remaining

    extracted = books.slice(rangeStart, rangeEnd)

    if (hasRemaining > 0) {
        for (const booksIndex of extracted) {
            const preview = createPreview(booksIndex)
            fragment.appendChild(preview)
        }
        
        document.querySelector("[data-list-items]").appendChild(fragment);
    }
    
    showmoreButton.innerHTML = /* html */ `
    Show more 
    <span class="list__remaining">
        (${hasRemaining})
    </span>
    `; 
};

showmoreButton.addEventListener("click", showMore) 

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }
