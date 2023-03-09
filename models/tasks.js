const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    name: String,
    time: String,
    note: String,
    
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task