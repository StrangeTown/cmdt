const sentence = (() => {
  const sentences = [
    {
      sentence:
        'The virus may also be transmitted by respiratory droplets expelled by an infected patient who comes into physical contact with another person',
      word: 'respiratory',
      definition: 'of or relating to breathing',
      image: 'https://s1.ax1x.com/2022/06/15/XoxKwF.jpg',
      imageAuthor: `<span class="rTNyH RZQOk">Photo by <a href="https://unsplash.com/@elijahdhiett?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Elijah Hiett</a> on <a href="https://unsplash.com/s/photos/breathing?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
      </span>`,
    },
  ]
  const init = () => {
    const random = Math.floor(Math.random() * sentences.length)
    const randomItem = sentences[random]
    const { sentence, word, definition, image, imageAuthor } = randomItem
    const sentenceWithWord = sentence.replace(
      word,
      `<span class="word">${word}</span>`
    )
    const sentenceClsElement = document.querySelector('.sentence')
    sentenceClsElement.innerHTML = sentenceWithWord
  }
  return {
    init,
  }
})()
const listener = (() => {
  const init = () => {
    const mainEle = document.querySelector('.main')
    const wordClsElement = document.querySelector('.word')
    if (!wordClsElement || !mainEle) {
      return
    }
    //hover event
    wordClsElement.addEventListener('mouseover', (e) => {
      mainEle.classList.add('focus')
    })
    wordClsElement.addEventListener('mouseout', (e) => {
      mainEle.classList.remove('focus')
    })
  }
  return {
    init,
  }
})()
const main = async () => {
  sentence.init()
  listener.init()
}

$(function () {
  main()
})
