// SELECTORS
const settingsButton = document.querySelector('[data-header-settings]')
const settingsMenu = document.querySelector('[data-settings-overlay]')
const settingsData = document.querySelector('[data-settings-form]')
const settingsTheme = document.querySelector('[data-settings-theme]')
const settingsCancel = document.querySelector('[data-settings-cancel]')
const settingsSave = document.querySelector('[data-settings-overlay] [type="submit"]')


// STATE
let theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day'

// ON MOUNT
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

settingsTheme.value = theme

document.documentElement.style.setProperty('--color-dark', css[theme].dark);
document.documentElement.style.setProperty('--color-light', css[theme].light);

// HANDLERS
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


// EVENTLISTENERS
settingsButton.addEventListener('click', showSettings)
settingsCancel.addEventListener('click', cancelSettings)
settingsSave.addEventListener('click', saveTheme)









 