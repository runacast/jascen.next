import mongoose from 'mongoose'

const { Schema } = mongoose

const paymentSchema = new Schema({
    ide: {
        type: Number,
        unique: true
    },
    cid: Number,
    cod: Number,
    date: {
        type: Date,
        default: Date()
    },
    charges: {
        type: Array,
        default: []
    }
})

const Payment = mongoose.models.payment || mongoose.model('payment', paymentSchema)

export default Payment