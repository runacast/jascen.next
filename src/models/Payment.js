import mongoose from 'mongoose'

const { Schema } = mongoose

const paymentSchema = new Schema({
    ide: {
        type: Number,
        unique: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    period: {
        type: String,
        maxlength: [100],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        Type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
})

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema)

export default Payment