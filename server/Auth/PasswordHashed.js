const bcrypt = require("bcryptjs")

const hashedPassword  = async(plainpassword) =>{
    const salt =await bcrypt.genSalt(10)

    return await bcrypt.hash(plainpassword,salt)
}

const ComparePassword =async (plainpassword,hashedPassword) =>{
    return await bcrypt.compare(plainpassword,hashedPassword)
}


module.exports ={hashedPassword,ComparePassword}