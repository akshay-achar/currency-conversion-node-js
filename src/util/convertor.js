const request = require('postman-request')

const currencyConvertor = async (fromTo, fromAmount) => {
  const url = 'https://free.currconv.com/api/v7/convert?q=' + fromTo + '&apiKey=' + process.env.CURRCONV_API_KEY
  return new Promise((resolve, reject) => {
    request.get(url, { json: true }, (error, response) => {
      try {
        if (error) {
          return reject('Please try again')
        }
        const value = response.body.results[fromTo].val
        return resolve(value * fromAmount)
      } catch (e) {
        return reject('Please try again')
      }
    })
  })
}

module.exports = {
  currencyConvertor
}
