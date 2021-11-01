const initBackgroundImage = () => {
  const images = [
    'https://z3.ax1x.com/2021/10/19/5d0lsH.jpg',
    'https://z3.ax1x.com/2021/10/20/5BM8tH.jpg',
    // 'https://z3.ax1x.com/2021/10/20/5BUlY6.jpg',
    'https://z3.ax1x.com/2021/10/20/5Bd4QU.jpg',
  ]
  const imgIndex = utils.getRandomInt(images.length)
  const imageUrl = images[imgIndex]
  const htmlEle = document.querySelector('html')
  htmlEle.style.backgroundImage = 'url(' + imageUrl + ')'
  // $('html').css('background-image', 'url(' + imageUrl + ')')
}
initBackgroundImage()
