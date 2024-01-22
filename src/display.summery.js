import { books, authors,  } from "./data.js"


// SELECTORS
const listItems = document.querySelector('[data-list-items]')
const summary = {
    overlay: document.querySelector('[data-list-active]'),
    background: document.querySelector('[data-list-blur]'),
    image: document.querySelector('[data-list-image]'),
    title: document.querySelector('[data-list-title]'),
    subtitle: document.querySelector('[data-list-subtitle]'),
    description: document.querySelector('[data-list-description]'),
    closeBtn: document.querySelector('[data-list-close]'),
}



// STATE
let active = false
let id = ''


// ON MOUNT
function getPreviewId(event) {
    const pathArray = Array.from(event. path || event.composedPath())
    let previewId = ''
    if (active) return

    for (const node of pathArray) {
        if (!node.dataset) {
            break
        } else if (node.dataset.preview) {
            return previewId = node.dataset.preview
        }
    }
}

function getBook(bookId) {
    for (const book of books) {
        if (book.id === bookId) return book
    }
}


// HANLERS
const showSummary = () => {
    active = getBook(id)

    if (!active) return
    const { title, image, description, published, author } = active

    summary.overlay.showModal()
    summary.background.src = image
    summary.image.src = image
    summary.title.innerText = title
    summary.subtitle.innerText = `${authors[author]} (${new Date(published).getFullYear()})`
    summary.description.innerText = description
}

const closeHandeler = () => {
    summary.overlay.close()
    active = null
}


// EVENTHANDLERS
listItems.addEventListener('click', (event) => {
    id = getPreviewId(event)
    showSummary()
})

summary.closeBtn.addEventListener('click', closeHandeler)