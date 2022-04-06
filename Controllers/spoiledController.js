    const SpoiledProducts = require('../Models/spoiledSchema')
    const { validationResult } = require('express-validator')

    module.exports.getAllSpoiledProductsOrOne = async (request, response, next) => {
    try {
        
        if (request.params.id) {
        const spoliedProduct = await SpoiledProducts.findById(request.params.id)
        response.json(spoliedProduct)
        } else {
        const spoiledProducts = await SpoiledProducts.find({})
        response.json(spoiledProducts)
        }
    } catch {
        (error) => next(error)
    }
    }


    module.exports.addSpoiledProduct = async (request, response, next) => {
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
        spoiledProducts,
    } = request.body
    const newSpoiledProduct = new SpoiledProducts({
        storeId,
        receiptId,
        spoiledProducts,
    })

    const spoiledProductData = await newSpoiledProduct.save()
    response.json({ msg: 'spoiledProduct added', spoiledProductData })
    }


    module.exports.updateSpoiledProduct = async (request, response, next) => {
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
        storeId,
        receiptId,
        spoiledProducts,

    } = request.body
    try {
        const spoliedProduct = await SpoiledProducts.findById(_id)

        if (!spoliedProduct) response.json({ msg: 'spoiledProduct not found' })

        spoliedProduct.storeId = storeId ;
        spoliedProduct.receiptId = receiptId ;
        spoliedProduct.spoiledProducts = spoiledProducts ;


        const updatedspoliededProduct = await spoliedProduct.save()

        response.json({ msg: 'spoiledProuct updated', updatedspoliededProduct })
    } 
    catch (error) {
        next(error)
    }
    }



    module.exports.deleteSpoiledProduct = async(request, response, next) => {
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
        const deletedSpoliedProduct = await SpoiledProducts.deleteOne({ _id: _id })
        response.send({ msg: 'spoiledProuct deleted', deletedSpoliedProduct })
    } catch (error) {
        next(error.message)
    }
    }
