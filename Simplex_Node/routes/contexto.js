/**
 * @author: Helen de Freitas Santos
 * @author: Matheus Shinji Fukuyama
 * @date: 01/04/2022
 * @desc: custom route for fetching data
*/

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {
        //custom route for fetching data
        var Controller = require('../controller/contexto');
        const passport = require('passport')
        var controller = new Controller();

        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/contextos', passport.authenticate('jwt', { session: false}), function (req, res) {
            const index = req.rawHeaders.indexOf('Authorization')
            controller.getAll(res, req.rawHeaders[index + 1]);
        });

        // here we gets id from request and passing to it object method.
        app.get('/rest/contexto/:id/', passport.authenticate('jwt', { session: false}), function (req, res) {
            const index = req.rawHeaders.indexOf('Authorization')
            controller.getById(req, res, req.rawHeaders[index + 1]);
        });

        // here we insert an object.
        app.post('/rest/contexto', passport.authenticate('jwt', { session: false}), function (req, res) {
            const index = req.rawHeaders.indexOf('Authorization')
            controller.add(req, res, req.rawHeaders[index + 1]);
        });

        // here we update an object.
        app.put('/rest/contexto', passport.authenticate('jwt', { session: false}), function (req, res) {
            const index = req.rawHeaders.indexOf('Authorization')
            controller.update(req, res, req.rawHeaders[index + 1]);
        });

        // here we delete an object passing id to it object method.
        app.delete('/rest/contexto/:id', passport.authenticate('jwt', { session: false}), function (req, res) {
            const index = req.rawHeaders.indexOf('Authorization')
            controller.deleteById(req.params.id, res, req.rawHeaders[index + 1]);
        });
    }

};