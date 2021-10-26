const config = {
  historyMaxResults: 5,
  downloadLimit: 5,
}

// Elements
const $garden = $('#garden')
const $history = $('.history_list')
const $download = $('.downloads_list')

const utils = (function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
  return {
    getRandomInt,
  }
})()

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
    const title = _.get(historyItem, 'title')
    const key = gardenKeys.getKey()
    gardenKeys.addHotKey(key)
    const keyLabel = key.replace('+', '')

    return `
    <div class='url_item'>
      <div class="key" title="Press ${key.toUpperCase()}">${keyLabel}</div>
      <a href='${url}' data-hot-key="${key}">${title}</a>
    </div>
  `
  }
  const getDownloadItemEle = (downloadItem) => {
    const id = _.get(downloadItem, 'id')
    const fileName = _.get(downloadItem, 'filename')
    const url = _.get(downloadItem, 'url')

    const filenameLabel = fileName.replace(/^.*[\\\/]/, '')

    return `
      <div class='download_item'>
        <div class='download_folder' data-id="${id}">📁</div>
        <a href='${url}' data-id="${id}" target="_blank">${filenameLabel}</a>
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

const initBackgroundImage = () => {
  const images = [
    'https://z3.ax1x.com/2021/10/19/5d0lsH.jpg',
    'https://z3.ax1x.com/2021/10/20/5BM8tH.jpg',
    // 'https://z3.ax1x.com/2021/10/20/5BUlY6.jpg',
    'https://z3.ax1x.com/2021/10/20/5Bd4QU.jpg'
  ]
  const imgIndex = utils.getRandomInt(images.length)
  const imageUrl = images[imgIndex]
  $('html').css('background-image', 'url(' + imageUrl + ')')
}

const main = () => {
  initBackgroundImage()
  gardenListener.listenChromeTab()
  searchHistory()
  searchDownload()
}

$(function() {
  main()
})
