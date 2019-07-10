const express = require('express');
const db = require('./userDb');
const router = express.Router();
const postDb = require('../posts/postDb')

router.post('/users', validateUser, (req, res) => {
    res.status(200).json(req.user)
});

router.post('/users/:id/posts', validatePost, (req, res) => {
    res.status(200).json(req.post)
});

router.get('/users', (req, res) => {
    db.get()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({Error: 'Internal server error'})
        })
});

router.get('/users/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user)
});

router.get('/users/:id/posts', validateUserId, (req, res) => {

});

router.delete('/users/:id', validateUserId, (req, res) => {
    res.status(204)
});

router.put('/users/:id', validateUserId, (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
    try {
        if (!isNaN(req.params.id)) {
    
            user = await db.getById(req.params.id)
            
            if (user !== undefined) {
                req.user = user
                next()
            }
            else {
                res.status(404).json({ Err: 'ID not here babycakes'})
            }
        }
        else {
            res.status(400).json({ Mesage: 'User ID is not a number' })
        }
    } catch (error) {
        console.log(error)
    }
};

async function validateUser(req, res, next) {
    try {
        
        if (Object.keys(req.body) != 0) {
            if (req.body.name) {
                user = await db.insert(req.body)
                req.user = user
                next()
            }
            else {
                res.status(400).json({ Message: 'Missing Required Name Field' })
            }
        }
        else
        {
            res.status(400).json({ Message: 'Missing User Data' })
        }
    } catch (error) {
        console.log(error)
    }
};

async function validatePost(req, res, next) {
    try {

        if (Object.keys(req.body) != 0) {
            if (req.body.text) {
                post = await postDb.insert(req.body)
                req.post = post
                next()
            }
            else {
                res.status(400).json({ Message: 'Missing Required Name Field' })
            }
        }
        else {
            res.status(400).json({ Message: 'Missing User Data' })
        }
    } catch (error) {
        console.log(error)
    }
    
};

module.exports = router;
