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

const main = async () => {
  note.init()
}

$(function () {
  main()
})
