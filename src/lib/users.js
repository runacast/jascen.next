import Model from '../../src/models/User'

export async function list(start = 0, limit = 0){

    try{

        const user = await Model()
        const users = await user.find({})
        const result = users.map(user => ({
            ...user.toObject(),
            _id: user._id.toString()
        }))
    
        return result

    }catch(err){
        console.error(err)
    }
    

}