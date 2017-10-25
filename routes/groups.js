var express = require('express');
var router = express.Router();
var contacts = require('../contacts/contacts-manage');


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(request, response){
    response.setHeader('content-type', 'application/json');
    response.send(JSON.stringify(contacts.list_groups()));
});

router.get('/:name', function(request, response){
    response.setHeader('content-type', 'application/json');
    response.send(JSON.stringify(contacts.get_members(request.params.name)));
});

module.exports = router;