const mongoose = require('mongoose');
const User = require('../models/user.model')
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports.register = (req, res, next) => {

    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            res.send(err);
        }
    })

}

module.exports.getDetails = (req, res) => {

    User.find({}, function (err, result) {
        console.log(result);
        res.send({
            "Data": result
        })
    });
}

// encreption text API 

module.exports.encrept = (req, res) => {
    var user = new User();
    user.password = req.body.password;
    function encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
       }
       
       function decrypt(text) {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
       }
       var data = req.body.text
       var hw = encrypt(data)
       console.log("i m here>>>>>>>>>>>>",hw)
       console.log("decrepet data here>>>>>>",decrypt(hw))
       res.send({
           "encreptData":hw,
            "decreptData": decrypt(hw)
        })

        

   /*  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(req.body.text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    user.Encreptresult = encrypted.toString('hex')
    user.pin = iv.toString('hex')
    console.log('encrept data >>>>>>>>>', user.Encreptresult);
    console.log('encrept data >>>>>>>>>', user.pin);
    user.save((err, result) => {
        if (!err) {
            res.send({
                "Data": result
            })
        } else {
            res.send(err);
        }
    }) */
}


module.exports.encreptdata = (req, res) => {
    User.find({_id: req.params.id}, function(err, docs){
        if(err) res.json(err);
        else
        res.send({
            "Data": docs[0]
        })
    });
}

module.exports.decrepetdata =(req,res)=>{
    console.log(">>>>>>>>>>",req.body);
    var user = new User();
    /*user.Encreptresult = req.body.Encreptresult; */
    user.password = req.body.password;
    /* user.pin = req.body.pin; */


/*     let iv = Buffer.from(req.body.Encreptresult,req.body.pin, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    var result = decrypted.toString();
    console.log("decrept result >>>>>>>>>>>>>>>>",result); */
    function encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
       }
       
       function decrypt(text) {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
       }
       
       var hw = encrypt(req.body.Encreptresult)
       console.log("i m here>>>>>>>>>>>>",hw)
       console.log("decrepet data here>>>>>>",decrypt(hw))
       res.send({
            "Data": decrypt(hw)
        })


    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            res.send(err);
        }
    })
}