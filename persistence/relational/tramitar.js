/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data


var Error = require('../../entity/error.js');



function TramitarPersistence() {
    
    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 

        db.tramitar
            .findAll()
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // this.getAll = function (res) {

    // get object by id
    this.getById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data

        db.tramitar
            .findAll({ 
                where: {id: id}
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
                
                this.id= object.id
                //getUltimo(JSON.parse(JSON.stringify(object)))
            })
    }; // this.getById = function (id, res) {
    
    // get ultimo
    this.getLast = async function (db, res) {
        id=0;
        let objeto
        // get id as parameter to passing into query and return filter data
        await db.tramitar
            .findOne({ 
                order: [ [ 'id', 'DESC' ]]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
                objeto= object;
 
            })
        return objeto;
          
    }; 

    this.getAtt = async function (db, offset, res) {
        id=0;
        let objeto
        // get id as parameter to passing into query and return filter data
        await db.tramitar
            .findOne({ 
                order: [ [ 'id', 'ASC' ]], 
                offset: offset
            })
            .then(object => {
                objeto= object;
 
            })
        return objeto;
          
    }; 
    
    this.add = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.tramitar
            .create(object) 
            .then(function (addedRecord) {
                var params = {
                    code:     200,
                    message:  'OK',
                    response: 'Record is successfully added.'
                };

                 var error = new Error(params);
                 res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao incluir a materia',
                    response: err
                };

                // var error = new Error(params);
                // res.json({error});
            });
    }; // this.add = function (object, res) {

    
    this.update = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.tramitar
            .update(object,
                {where: {
                    id: object.id
                }})
            .then(function (updatedRecord) {
                var params = {
                    code:     200,
                    message:  'OK',
                    response: 'Record is successfully updated.'
                };

                var error = new Error(params);
                res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao alterar a materia',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // this.update = function (object, res) {
    

    this.deleteById = async function (db, id, res) {
        await db.tramitar
            .destroy({
                where: {
                    id: id
                }})
            .then(function (deletedRecord) {
                if (deletedRecord === 1) {
                    code = 200;
                    message = 'OK';
                    response = 'Record is successfully deleted.';
                } 
                else {
                        code = 404;
                        message = 'OK';
                        response = 'Record not found.';
                }
                var params = {
                    code:     code,
                    message:  message,
                    response: response
                };

                var error = new Error(params);
                res.json({error});
            })
            .catch(function (err) {


            });

    }; // this.deleteById = function (id, res) {

}

module.exports = TramitarPersistence;