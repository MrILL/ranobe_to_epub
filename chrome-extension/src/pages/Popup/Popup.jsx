import React from 'react'

import logo from '../../assets/img/logo.svg'
import Greetings from '../../containers/Greetings/Greetings'
import './Popup.css'

const backendUrl = 'http://localhost:5000'

const fetchNestjsEpub = (title, chapters) => {
  return fetch(`${backendUrl}/epub-gen`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      chapters,
    }),
  })
}

const backendChapterAdapter = (chapter) => {
  return {
    content: chapter,
  }
}

const Popup = () => {
  const onClickHandler = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      console.log(tabs)
      chrome.tabs.sendMessage(tabs[0].id, { type: 'scrape' }, (rawChapter) => {
        const { title, content } = rawChapter

        console.log('title: ', title)
        console.log('content: ', content)

        fetchNestjsEpub(title, [backendChapterAdapter(content)]).then(
          async (res) => {
            if (res.status === 201) {
              const blob = await res.blob()
              const url = URL.createObjectURL(blob)
              chrome.downloads.download({
                filename: title + '.epub',
                url,
                saveAs: true,
              })
            }
          }
        )
      })
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClickHandler}>Download file</button>
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
