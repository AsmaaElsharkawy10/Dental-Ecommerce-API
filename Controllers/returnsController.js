    const Returns = require('../Models/returnsSchema')
    const { validationResult } = require('express-validator')

    /*------------------------------- Get AllReturns or One-------------------------------*/

    module.exports.getAllReturnsOrOne = async (request, response, next) => {
    try {
        // check param id sent
        if (request.params.id) {
        const returnedProuct = await Returns.findById(request.params.id)
        response.json(returnedProuct)
        } else {
        const returnProucts = await Returns.find({})
        response.json(returnProucts)
        }
    } catch {
        ;(error) => next(error)
    }
    }

    /*------------------------------- Add returnedProduct-------------------------------*/

    module.exports.addReturnedProduct = async (request, response, next) => {
    let errors = validationResult(request)
    if (!errors.isEmpty()) {
        let error = new Error()
        error.status = 422
        error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + ' ', '')
        throw error
    }

    const {
        storeId,
        receiptId,
        returnedProucts,
    } = request.body
    const newReturnedProduct = new Returns({
        storeId,
        receiptId,
        returnedProucts,
    })

    const returnedProductData = await newReturnedProduct.save()
    response.json({ msg: 'returnedProduct added', returnedProductData })
    }

    /*------------------------------- Update returnedProduct-------------------------------*/
    exports.updateReturnedProduct = async (request, response, next) => {
    let errors = validationResult(request)
    if (!errors.isEmpty()) {
        let error = new Error()
        error.status = 422
        error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + ' ', '')
        throw error
    }
    const {
        _id,
        storeName,
        storePhone,
        storeAddress,
        storeRent,
        storeEmployeesId,
        storeCategoriesId,
    } = request.body
    try {
        const returnedProduct = await Returns.findById(_id)

        if (!returnedProduct) response.json({ msg: 'returnedProduct not found' })

        // store.storeName = storeName ;
        // store.storePhone = storePhone ;
        // store.storeAddress = storeAddress ;
        // store.storeRent = storeRent ;
        // store.storeEmployeesId = storeEmployeesId ;
        // store.storeCategoriesId = storeCategoriesId ;

        const updatedreturnedProduct = await returnedProduct.save()

        response.json({ msg: 'returnedProduct updated', updatedreturnedProduct })
    } catch (error) {
        next(error)
    }
    }

    /*------------------------------- Delete returnProduct-------------------------------*/

        exports.deleteReturnedProduct = async(request, response, next) => {
    let errors = validationResult(request)
    if (!errors.isEmpty()) {
        let error = new Error()
        error.status = 422
        error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + ' ', '')
        throw error
    }
    const { _id } = request.body
    try {
        const deletedReturnedProduct = await Returns.deleteOne({ _id: _id })
        response.send({ msg: 'store deleted', deletedReturnedProduct })
    } catch (error) {
        next(error.message)
    }
    }
