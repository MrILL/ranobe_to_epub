console.log('detected ranobe page at ranobelib.me domain')

const getTitle = () => {
  const title = document.getElementsByClassName(
    'reader-header-actions.reader-header-action__text'
  )[0].textContent

  return title
}

const getContent = () => {
  const content =
    // document.getElementsByClassName('reader-container')[0].outerHTML
    document.evaluate(
      '//div[@class="reader-header-action__text"]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue.outerHTML

  return content
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender)

  const messageHandlers = {
    scrape: () => {
      const data = {
        title: getTitle(),
        content: getContent(),
      }

      return data
    },
  }

  const handler = messageHandlers[message.type]
  if (!handler) {
    throw new Error('Not supported message: ' + message)
  }

  const res = handler()
  console.log(res)

  sendResponse(res)
  return true
})
