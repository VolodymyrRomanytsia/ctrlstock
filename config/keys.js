if (process.env.NODE === 'production') {
    module.exports = require('./keys.prod')
} else {
    module.exports = require('./keys.dev')
}