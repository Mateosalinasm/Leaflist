const express = require('express');
const router = express.Router()
const Task = require('../models/tasks.js')

//Routes

//Authentication Required
const authRequired = (req, res, next) => {
    if(req.session.currentUser) {
        next()
    } else {
        console.log('no user present')
        res.redirect('/no-user')
    }
}

//Index route
router.get('/', authRequired, (req, res) => {
    Task.find({}, (err, foundTask) => {
        
        if (err) {
            console.log(err)
            res.send(err.message)
        }
        else {
            // console.log(foundTask)
            res.render('index.ejs', {
                tasks: foundTask
            })
        }
        })
})

//Create route
router.post('/', (req, res) => {
    Task.create(req.body, (err, createdTask) => {
        console.log(createdTask);
        res.redirect('/tasks')
    })
})

//New Form route 
router.get('/new', authRequired, (req, res) => {
    res.render('new.ejs')
})


//Show Route
router.get('/:id', authRequired, (req, res) => {
    Task.findById(req.params.id, (err, foundTask) => {
        if(err) {
            console.log(err.message);
            res.send(err.message)
        } else {
            res.render('show.ejs', {
                task: foundTask
            })
        }
    })
})

//Edit Form Route
router.get('/:id/edit', authRequired, (req, res) => {
    Task.findById(req.params.id, (err, foundTask) => {
        if(err) {
            console.log(err.message)
            res.send(err.message)
        } else {
            res.render('edit.ejs', {
                task: foundTask
            })
        }
    })
})

//Edit Route
router.put('/:id', (req, res) => {
    const updatedFields = {};
    if (req.body.name !== '') {
    updatedFields.name = req.body.name;
    }
    if (req.body.time !== '') {
    updatedFields.time = req.body.time;
    }
    if (req.body.note !== '') {
    updatedFields.note = req.body.note;
    }
    Task.findByIdAndUpdate(req.params.id, { $set: updatedFields }, (err, editedTask) => {
    if (err) {
        console.log(err.message);
        res.send(err.message);
    } else {
        console.log(editedTask);
        res.redirect('/tasks/' + req.params.id);
    }
    });
});

//Delete Route
router.delete('/:id', (req, res) => {
    console.log('delete route');
    Task.findByIdAndDelete(req.params.id, req.body, (err, deletedTask) => {
        if(err) {
            console.log(err.message);
            res.send(err.message)
        } else {
            console.log(deletedTask);
            res.redirect('/tasks')
        }
    })
})

// DESTROY SESSION ROUTE
router.get('/sign-out', (req, res) => {
    // this destroys the session
    req.session.destroy()
    res.redirect('/home')
})
// router.get('/seed', (req, res) =>{
// 	Task.create([
// 		{
//             name:'grapefruit',
//             color:'pink',
//             readyToEat:true
//         },
//         {
//             name:'grape',
//             color:'purple',
//             readyToEat:false
//         },
//         {
//             name:'avocado',
//             color:'green',
//             readyToEat:true
//         }
// 	], (err, data) => {
// 		res.redirect('/todo')
// 	})
// })

module.exports = router