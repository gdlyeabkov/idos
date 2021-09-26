const fs = require('fs')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const url = `mongodb+srv://glebClusterUser:glebClusterUserPassword@cluster0.fvfru.mongodb.net/chronicle?retryWrites=true&w=majority`;

var options = {
    root: path.join(__dirname, 'views'),
}   

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const IndigeneSchema = new mongoose.Schema({
    name: String,
    password: String
}, { collection : 'myindigenes' });

const IndigeneModel = mongoose.model('IndigeneModel', IndigeneSchema);

const TackleSchema = new mongoose.Schema({
    fishId: String
}, { collection : 'mytackles' });

const TackleModel = mongoose.model('TackleModel', TackleSchema);

const FishSchema = new mongoose.Schema({
    name: String,
    path: String,
    ext: {
        type: String,
        default: 'exe'
    },
    isPreserve: {
        type: Boolean,
        default: false
    },
}, { collection : 'myfishes' });

const FishModel = mongoose.model('FishModel', FishSchema);


app.get('/home', async (req, res)=>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    return res.json({ status: "OK" })
    
})

app.get('/indigenes/check', (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    let queryBefore = IndigeneModel.find({ name: { $in: req.query.indigenename }  })
    queryBefore.exec((err, allIndigenes) => {
        if(err){
            return res.json({ "status": "Error" })
        }
        if(allIndigenes.length >= 1){
            let query =  IndigeneModel.findOne({'name': req.query.indigenename}, function(err, indigene){
                if (err){
                    return res.json({ "status": "Error" })
                } else {
                    const passwordCheck = bcrypt.compareSync(req.query.indigenepassword, indigene.password) && req.query.indigenepassword !== ''
                    if(indigene != null && indigene != undefined && passwordCheck){
                        return res.json({ "status": "OK", "indigene": indigene })
                    } else {
                        return res.json({ "status": "Error" })
                    }
                }
            })    
        } else if(allIndigenes.length <= 0){
            return res.json({ "status": "Error" })
        }
    })
})

app.get('/indigenes/create', async (req, res)=>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    let query = IndigeneModel.find({})
    query.exec((err, allIndigenes) => {
        if (err){
            return res.json({ "status": "Error" })
        }
        
        var indigeneExists = false;

        allIndigenes.forEach(indigene => {
            if(indigene.name.includes(req.query.indigenename)){
                indigeneExists = true
            }
        });
        if(indigeneExists){
            return res.json({ "status": "Error" })
        } else {
            let encodedPassword = "#"
            const salt = bcrypt.genSalt(saltRounds)
            encodedPassword = bcrypt.hashSync(req.query.indigenepassword, saltRounds)
            const indigene = new IndigeneModel({ name: req.query.indigenename, password: encodedPassword });
            indigene.save(function (err) {
                if(err){
                    return res.json({ "status": "Error" })
                } else {
                    return res.json({ "status": "OK" })
                }
            })
        }
    });
    
})

app.get('/indigene/get', async (req, res)=>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    let queryOfIndigenes = IndigeneModel.findOne({ name: req.query.indigenename })
    queryOfIndigenes.exec((err, indigene) => {
        if (err){
            return res.json({ "status": "Error" })
        }
        let queryOfTackles = TackleModel.find({  })
        queryOfTackles.exec((err, allTackles) => {
            if (err){
                return res.json({ "status": "Error" })
            }
            let queryOfFishes = FishModel.find({  })
            queryOfFishes.exec((err, allFishes) => {
                if (err){
                    return res.json({ "status": "Error" })
                }
              return res.json({ "status": "OK", "indigene": indigene, "tackles": allTackles, "fishes": allFishes })
            })
        })
    })
    
})

app.get('/fishes/get', async (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    let queryOfFishes = FishModel.find({  })
    queryOfFishes.exec((err, allFishes) => {
        if (err){
            return res.json({ "status": "Error" })
        }
        return res.json({ "status": "OK", "fishes": allFishes })
    })
})

app.get('/fishes/create', async (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    let query = FishModel.find({})
    query.exec((err, allFishes) => {
        if (err){
            return res.json({ "status": "Error" })
        }
        var fishExists = false;
        allFishes.forEach(fish => {
            if(fish.name.includes(req.query.fishname)){
                fishExists = true
            }
        });
        if(fishExists){
            return res.json({ "status": "Error" })
        } else {
            const fish = new FishModel({ name: req.query.fishname, isPreserve: req.query.preserve.includes("true"), path: req.query.fishpath });
            fish.save(function (err) {
                if(err){
                    return res.json({ "status": "Error" })
                } else {
                    return res.json({ "status": "OK" })
                }
            })
        }
    });
})

app.get('/tackles/create', async (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    let query = TackleModel.find({})
    query.exec((err, allTackles) => {
        if (err){
            return res.json({ "status": "Error" })
        }
        var tackleExists = false;
        allTackles.forEach(tackle => {
            if(tackle.fishId.includes(req.query.fishid)){
                tackleExists = true
            }
        });
        if(tackleExists){
            return res.json({ "status": "Error" })
        } else {
            const tackle = new TackleModel({ fishId: req.query.fishid });
            tackle.save(function (err) {
                if(err){
                    return res.json({ "status": "Error" })
                } else {
                    return res.json({ "status": "OK" })
                }
            })
        }
    });
})

app.get('**', (req, res) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    return res.redirect(`/?redirectroute=${req.path}`)
})

// const port = process.env.PORT || 8080
const port = 4000  
app.listen(port)