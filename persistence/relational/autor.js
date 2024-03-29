/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data


var Error = require('../../entity/error.js');
const sequelize = require('sequelize');
const { where } = require('sequelize');

function AutorPersistence() {
    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 

        db.autor
            .findAll()
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // this.getAll = function (res) {
        
    this.getAutorMateria = function (db, res) {
            // calling acquire methods and passing callback method that will be execute query
            // return response to server 
    
            db.autor
                .findAll({
                    
                    attributes: {
                            
                        include: [
                            [
                                // Note the wrapping parentheses in the call below!
                            sequelize.literal(`(
                                    SELECT COUNT(*)
                                    FROM materia, propoe
                                    WHERE
                                        autor.id         = propoe.idAutor
                                    AND
                                        propoe.idMateria = materia.id
                                    HAVING Count(*) > 250
                                )`),
                                'qtde'
                            ]
                            
                        ],
                        exclude: ['id', 'cargo', 'updated_at', 'created_at']
                    },
                       // where: sequelize.where(sequelize.literal(`'qtde'`), sequelize.not),
                        group: 'nome'
                               
                    
                })
                .then(object => {
                    res.send(JSON.parse(JSON.stringify(object)));
                });
        };

    // get object by id
    this.getById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data

        db.autor
            .findAll({ 
                where: {id: id}
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
                
            })
    }; // this.getById = function (id, res) {

       // get object by nome
       this.getByName = async function (db, object, res) {
        // get nome as parameter to passing into query and return filter data
       // find=false
       let objeto
       await db.autor
            .findAll({ 
                where: {
                    nome: object.nome,
                    cargo: object.cargo
                }
            })
            .then(object => {
               objeto= object
                // if(object!=null){
                //     console.log('entrou')
                //   res.send(JSON.parse(JSON.stringify(object)));
                 
                //     find=true
                // }

            })
            return objeto;
    };

    this.getLast = async function (db, res) {
            
        let objeto
        // get id as parameter to passing into query and return filter data
        await db.autor
            .findOne({ 
                order: [ [ 'id', 'DESC' ]]
            })
            .then(object => {
                objeto= object;
            })
        return objeto;
          
    }; 

    this.add = async function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        await db.autor
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
                    message:  'Erro ao incluir autor',
                    response: err
                };

                // var error = new Error(params);
                // res.json({error});
            });
    }; // this.add = function (object, res) {

    
    this.update = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.autor
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
                    message:  'Erro ao alterar autor',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // this.update = function (object, res) {
    

    this.deleteById = function (db, id, res) {
        db.autor
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
                var params = {
                    code:     500,
                    message:  'Erro ao excluir',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });

    }; // this.deleteById = function (id, res) {

}

module.exports = AutorPersistence;