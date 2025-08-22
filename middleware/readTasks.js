const fs = require('fs').promises
const path = require('path')

const readTasks = async (req, res, next) => {
    const tasks = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'task', 'tasks.json'), 'utf-8'))
    res.locals.tasks = tasks
    next()
}

module.exports = { readTasks }