const config = {
  historyMaxResults: 5,
  downloadLimit: 5,
}

// Elements
const $garden = $('#garden')
const $history = $('.history_list')
const $download = $('.downloads_list')

const gardenKeys = (function () {
  const leftKeys = [
    'q',
    'w',
    'e',
    'r',
    't',
    'a',
    's',
    'd',
    'f',
    'g',
    'z',
    'x',
    'c',
    'v',
    'b',
  ]
  const rightKeys = ['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', 'n', 'm']
  const existedKeys = []

  const getKey = () => {
    const leftLength = leftKeys.length
    const rightLength = rightKeys.length

    const leftIndex = utils.getRandomInt(leftLength - 1)
    const rightIndex = utils.getRandomInt(rightLength - 1)

    return `${leftKeys[leftIndex]}+${rightKeys[rightIndex]}`
  }

  const addHotKey = (key) => {
    hotkeys(key, function (e, handler) {
      const nodes = document.querySelectorAll('a')
      for (let i = 0; i < nodes.length; i++) {
        const ele = nodes[i]
        const hotKeyData = ele.dataset.hotKey
        if (hotKeyData === key) {
          ele.classList.add('shake')
          ele.click()
        }
      }
    })
  }

  return {
    getKey,
    addHotKey,
  }
})()

const gardenDom = (function () {
  const getUrlItem = (historyItem) => {
    const url = _.get(historyItem, 'url')
    const title = _.get(historyItem, 'title') || '(no title)'
    const key = gardenKeys.getKey()
    gardenKeys.addHotKey(key)
    const keyLabel = key.replace('+', '')

    return `
    <div class='url_item'>
      <div class="key" title="Press ${key.toUpperCase()}">${keyLabel}</div>
      <div class="link_wrap">
        <a href='${url}' data-hot-key="${key}">${title}</a>
      </div>
    </div>
  `
  }
  const getDownloadItemEle = (downloadItem) => {
    const id = _.get(downloadItem, 'id')
    const fileName = _.get(downloadItem, 'filename') || '(no title)'
    const url = _.get(downloadItem, 'url')

    const filenameLabel = fileName.replace(/^.*[\\\/]/, '')

    return `
      <div class='download_item'>
        <div class='download_folder' data-id="${id}">📁</div>
        <div class="link_wrap">
          <a href='${url}' data-id="${id}" target="_blank">${filenameLabel}</a>
        </div>
      </div>
    `
  }
  return {
    getUrlItem,
    getDownloadItemEle,
  }
})()

const gardenListener = (function () {
  const initOpenDownloadFileListener = () => {
    $('.download .download_folder').on('click', function () {
      const ele = $(this)
      const downloadId = ele.data('id')
      if (downloadId) {
        chrome.downloads.show(downloadId)
      }
    })
  }
  const listenChromeTab = () => {
    $('.chrome_tab_link').on('click', function () {
      const ele = $(this)
      const tabUrl = ele.data('href')
      if (tabUrl) chrome.tabs.create({ url: tabUrl })
    })
  }
  return {
    initOpenDownloadFileListener,
    listenChromeTab,
  }
})()

const searchHistory = () => {
  chrome.history.search(
    { text: '', maxResults: config.historyMaxResults },
    function (data) {
      console.log(data)
      let urls = ''
      data.forEach(function (page) {
        urls += gardenDom.getUrlItem(page)
      })
      $history.append(urls)
    }
  )
}

const searchDownload = () => {
  chrome.downloads.search({ limit: config.downloadLimit }, function (data) {
    let downloadEles = ''
    data.forEach(function (item) {
      console.log(item)
      downloadEles += gardenDom.getDownloadItemEle(item)
    })
    $download.append(downloadEles)
    gardenListener.initOpenDownloadFileListener()
  })
}

const note = (function () {
  const noteStorageKey = 'note'
  const noteTextarea = $('#note_textarea')

  const listenNoteChange = () => {
    noteTextarea.on('input', function (e) {
      const value = e.target.value
      chrome.storage.sync.set({
        [noteStorageKey]: value
      })
    })
  }
  const initNoteValue = () => {
    chrome.storage.sync.get([noteStorageKey], function(result) {
      const noteValue = _.get(result, 'note')
      noteTextarea.val(noteValue)
    })
  }

  const init = () => {
    initNoteValue()
    listenNoteChange()
  }
  
  return { init }
})()
const main = () => {
  gardenListener.listenChromeTab()
  searchHistory()
  searchDownload()
  note.init()
}

$(function () {
  main()
})
