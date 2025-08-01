import express from 'express'
import {createPurchase,getAllPurchases,getPurchaseById,removePurchaseById,updatePurchaseById} from '../controllers/purchase.controller.js'

const router = express.Router()

router.post('/api/purchase', createPurchase)
router.get('/api/purchase', getAllPurchases)
router.get('/api/purchase/:id', getPurchaseById)
router.delete('/api/purchase/:id', removePurchaseById)
router.put('/api/purchase/:id', updatePurchaseById)

export default router
