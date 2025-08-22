const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs').promises
const { readTasks } = require('./middleware/readTasks')

app.use(express.static('view'))
app.use(express.urlencoded())


// homepage
app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'view', 'home.ejs'))
})

// main page 
app.get('/tasks', readTasks, (req, res) => {
    res.render(path.join(__dirname, 'view', 'tasks.ejs'))
})

// middleware-ov kardum enq task jsony u avelacnum tasker
app.post('/tasks', readTasks, async (req, res) => {
    const { tasks } = res.locals
    const task = {
        id: new Date().getTime(),
        content: req.body.task
    }
    if (task.content) {
        tasks.push(task)
    }
    await fs.unlink(path.join(__dirname, 'task', 'tasks.json'))
    await fs.appendFile(path.join(__dirname, 'task', 'tasks.json'), JSON.stringify(tasks, null, 2))
    res.redirect('/tasks')
    console.log(tasks)  
})

// DELETE task
app.post('/tasks/delete/:id', readTasks, async (req, res) => {
    let { tasks } = res.locals
    tasks = tasks.filter(t => t.id != req.params.id)

    await fs.unlink(path.join(__dirname, 'task', 'tasks.json'))
    await fs.appendFile(path.join(__dirname, 'task', 'tasks.json'), JSON.stringify(tasks, null, 2))

    res.redirect('/tasks')
})


app.listen(3000)
