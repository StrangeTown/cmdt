const sentence = (() => {
  const sentences = [
    {
      sentence:
        'The virus may also be transmitted by respiratory droplets expelled by an infected patient who comes into physical contact with another person',
      word: 'respiratory',
      definition: 'of or relating to breathing',
      image: 'https://s1.ax1x.com/2022/06/15/XoxKwF.jpg',
    },
    {
      sentence: 'There was a stronger rationale for reform and both international and domestic factors played important roles.',
      word: 'rationale',
      definition: 'the reasons or intentions that cause a particular set of beliefs or actions',
      image: 'https://s1.ax1x.com/2022/06/17/XqS5e1.jpg',
    },
    {
      sentence: 'During the riot shops were looted and cars damaged or set on fire.',
      word: 'loot',
      definition: 'to steal from shops and houses',
      image: 'https://s1.ax1x.com/2022/06/17/XqkO41.jpg'
    },
    {
      sentence: 'The linkage between translation and interpreting in the media context is another subject worth delving into in the future.',
      word: 'delving',
      definition: 'to search, especially as if by digging, in order to find a thing or information',
      image: 'https://s1.ax1x.com/2022/06/17/Xqm43R.jpg'
    },
    {
      sentence: 'He needs to get his mojo working if he\'s going to win the election.',
      word: 'mojo',
      definition: 'a quality that attracts people to you and makes you successful and full of energy',
      image: 'https://s1.ax1x.com/2022/06/17/Xqu5m6.jpg'
    },
  ]
  const renderSentence = (sentence, word) => {
    const sentenceWithWord = sentence.replace(
      word,
      `<span class="word">${word}</span>`
    )
    const sentenceClsElement = document.querySelector('.sentence')
    sentenceClsElement.innerHTML = sentenceWithWord
  }
  const renderDefinition = (definition, image) => {
    const definitionClsElement = document.querySelector('.definition')
    definitionClsElement.innerHTML = definition
    // definition_img
    const definitionImgClsElement = document.querySelector('.definition_img')
    definitionImgClsElement.src = image
  }
  const init = () => {
    const random = Math.floor(Math.random() * sentences.length)
    const randomItem = sentences[random]
    const { sentence, word, definition, image, } = randomItem

    renderSentence(sentence, word)
    renderDefinition(definition, image)
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
