var express = require('express');
var router = express.Router();
var contacts = require('../contacts/contacts-manage');
var url = require ('url');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

/* GET all contact list*/
router.get('/', function (request, response){
    var get_params = url.parse(request.url, true).query;
    if(Object.keys(get_params).length === 0){
        response.setHeader('Content-type', 'application/json');
        response.send(JSON.stringify(contacts.lists()));
    }else{
        response.setHeader('content-type', 'application/json');
        response.send(JSON.stringify(contacts.query_by_arg(get_params.args, get_params.value)));
    }
});

router.get('/:number', function(request, response){
    response.setHeader('content-type', 'application/json');
    response.send(JSON.stringify(contacts.query(request.params.number)));
});



module.exports = router;
