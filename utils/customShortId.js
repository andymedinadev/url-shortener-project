const { randomInt } = require('crypto')

class CustomShortId {
  constructor (characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-') {
    this.setCharacters(characters)
  }

  setCharacters (characters) {
    if (characters.length < 2) {
      throw new Error('El conjunto de caracteres debe tener al menos 2 caracteres.')
    }
    this.characters = characters
    this.base = characters.length
  }

  generate (length = 3) {
    let id = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = randomInt(0, this.base)
      id += this.characters[randomIndex]
    }
    return id
  }
}

const shortid = new CustomShortId('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

module.exports = shortid
