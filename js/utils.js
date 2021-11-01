const utils = (function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
  return {
    getRandomInt,
  }
})()
