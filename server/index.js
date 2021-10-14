const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');
const path = require('path');

require('dotenv').config({
    path: path.resolve('vars.env'),
});

mongoose.connect(process.env.DB || process.env.MYDB, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongo');
    })
    .catch(err => {
        console.log('connection error');
        console.log(err);
    })
const User = require('./Models/user');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

const parseJSON = (bodyParser.json());
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
};
app.use(session(sessionOptions));

app.post('/register', async (req, res) => {
    const { user, pass } = req.body;
    const hashed = await bcrypt.hash(pass, 12);
    const isMade = await User.find({ username: user })
    if (isMade.length < 1) {
        const newUser = new User({
            username: user,
            password: hashed,
            courses: [],
            rounds: []
        })
        await newUser.save();
        res.send('success');
    } else {
        res.send('username');
    }

})
app.post('/checklogin', async (req, res) => {
    const { user, pass } = req.body;
    if (user && pass) {
        const curUser = await User.findOne({ username: user });
        if (curUser) {
            const isValid = await bcrypt.compare(pass, curUser.password);
            if (isValid) {
                req.session.user_id = curUser._id;
                res.send('success')
            } else {
                res.send('wrong')
            }
        } else {
            res.send('wrong')
        }
    } else {
        res.send('fail')
    }
})
app.post('/islogged', (req, res) => {
    if (req.session.user_id) {
        res.send(true);
    } else {
        res.send(false);
    }
})
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    console.log(req.session.user_id)
    req.session.destroy();
})
app.post('/postRound', async (req, res) => {
    const { eighteen, courseName, score, GIR, FIR, putts } = req.body;
    const filter = { _id: req.session.user_id };
    const curRound = { id: uuid(), eighteen, courseName, score, GIR, FIR, putts };
    await User.findOneAndUpdate(filter, { $push: { rounds: curRound } });

})
app.post('/newCourse', parseJSON, async (req, res) => {
    const { eighteen, courseName, city, state, color, hole1, hole2, hole3, hole4, hole5, hole6, hole7, hole8, hole9, hole10, hole11, hole12, hole13, hole14, hole15, hole16, hole17, hole18 } = req.body;
    const filter = { _id: req.session.user_id };
    if (eighteen) {
        await User.findOneAndUpdate(filter, {
            $push: {
                courses: {
                    id: uuid(),
                    eighteen,
                    courseName,
                    city,
                    state,
                    color,
                    hole1, hole2, hole3, hole4, hole5, hole6, hole7, hole8, hole9, hole10, hole11, hole12, hole13, hole14, hole15, hole16, hole17, hole18
                }
            }
        })
    } else if (!eighteen) {
        await User.findOneAndUpdate(filter, {
            $push: {
                courses: {
                    id: uuid(),
                    eighteen,
                    courseName,
                    city,
                    state,
                    color,
                    hole1, hole2, hole3, hole4, hole5, hole6, hole7, hole8, hole9
                }
            }
        })
    }
})
app.post('/getdata', async (req, res) => {
    const filter = { _id: req.session.user_id };
    const curUser = await User.findOne(filter);
    if (curUser) {
        res.send(curUser.courses)
    }
})
app.post('/getrounds', async (req, res) => {
    const filter = { _id: req.session.user_id };
    const curUser = await User.findOne(filter);
    if (curUser) {
        res.send(curUser)
    }
})


app.delete('/editCourse', parseJSON, async (req, res) => {
    await User.findOneAndUpdate({ "_id": req.session.user_id, "courses.id": req.body.id }, {
        $pull: {
            "courses": { "id": req.body.id }
        }
    }, { new: true })
})
app.delete('/deleteRound', parseJSON, async (req, res) => {
    await User.findOneAndUpdate({ "_id": req.session.user_id, "rounds.id": req.body.id }, {
        $pull: {
            "rounds": { "id": req.body.id }
        }
    }, { new: true })
})

app.put('/editCourse', parseJSON, async (req, res) => {
    const { id, eighteen, courseName, city, state, color, hole1, hole2, hole3, hole4, hole5, hole6, hole7, hole8, hole9, hole10, hole11, hole12, hole13, hole14, hole15, hole16, hole17, hole18 } = req.body;

    if (eighteen) {
        await User.findOneAndUpdate({ "_id": req.session.user_id, "courses.id": id }, {
            $set: {
                "courses.$.eighteen": eighteen,
                "courses.$.courseName": courseName,
                "courses.$.city": city,
                "courses.$.state": state,
                "courses.$.color": color,
                "courses.$.hole1": hole1,
                "courses.$.hole2": hole2,
                "courses.$.hole3": hole3,
                "courses.$.hole4": hole4,
                "courses.$.hole5": hole5,
                "courses.$.hole6": hole6,
                "courses.$.hole7": hole7,
                "courses.$.hole8": hole8,
                "courses.$.hole9": hole9,
                "courses.$.hole10": hole10,
                "courses.$.hole11": hole11,
                "courses.$.hole12": hole12,
                "courses.$.hole13": hole13,
                "courses.$.hole14": hole14,
                "courses.$.hole15": hole15,
                "courses.$.hole16": hole16,
                "courses.$.hole17": hole17,
                "courses.$.hole18": hole18,

            }
        })
    } else if (!eighteen) {
        await User.findOneAndUpdate({ "_id": req.session.user_id, "courses.id": id }, {
            $set: {
                "courses.$.eighteen": eighteen,
                "courses.$.courseName": courseName,
                "courses.$.city": city,
                "courses.$.state": state,
                "courses.$.color": color,
                "courses.$.hole1": hole1,
                "courses.$.hole2": hole2,
                "courses.$.hole3": hole3,
                "courses.$.hole4": hole4,
                "courses.$.hole5": hole5,
                "courses.$.hole6": hole6,
                "courses.$.hole7": hole7,
                "courses.$.hole8": hole8,
                "courses.$.hole9": hole9,

            }
        })
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`running on port ${port}`);
})