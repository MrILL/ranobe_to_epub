console.log('This is a popup!')

//TODO get url
// const url =
async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true }
    const [tab] = await chrome.tabs.query(queryOptions)

    return tab
}




//for every website create own scraper

class RanobelibDotMeScraper {}



async function main() {
    const tab = await getCurrentTab()
    
    console.log(tab)
    console.log(tab.url)
}

main()