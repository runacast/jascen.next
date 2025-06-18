import User from '../../src/models/User'

export async function list(start = 0, limit = 0){
    
    const users = await User.find({})
    const result = users.map(user => ({
        ...user.toObject(),
        _id: user._id.toString()
    }));

    return result

}