const mongoose = require("mongoose")
const connection = mongoose.connect('mongodb+srv://Harsh:ranjan@cluster0.kofyl9t.mongodb.net/bugdb?retryWrites=true&w=majority')

module.exports = {connection}