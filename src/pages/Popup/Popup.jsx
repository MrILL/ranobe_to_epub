import React from 'react'
import logo from '../../assets/img/logo.svg'
import Greetings from '../../containers/Greetings/Greetings'
import './Popup.css'

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={() => {
            chrome.tabs.query(
              { active: true, lastFocusedWindow: true },
              (tabs) => {
                console.log(tabs)
                chrome.tabs.sendMessage(
                  tabs[0].id,
                  { type: 'scrape' },
                  (res) => {
                    // console.log('response: ', res)
                    console.log('title: ', res.title)
                    console.log('content: ', res.content)

                    const blob = new Blob([res.content], { type: 'text/plain' })
                    const url = URL.createObjectURL(blob)
                    chrome.downloads.download({
                      filename: res.title + '.txt',
                      url,
                      saveAs: true,
                    })
                  }
                )
              }
            )
          }}
        >
          Download file
        </button>
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  )
}

export default Popup
