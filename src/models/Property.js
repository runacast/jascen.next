import mongoose from 'mongoose';

const { Schema } = mongoose

const propertySchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    title: {
        type: String,
        require: true,
        maxlength: [50]
    },
    address: {
        type: String,
        require: true,
        maxlength: [120]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema)

export default Property