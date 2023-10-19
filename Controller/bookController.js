const Book = require('../Model/Book')

//getdata/getBook
exports.getBook = async (req,res)=>{
    try {
        const data = await Book.find()
        return res.json({errors:false,data:data}) 
    } catch (error) {
        return res.status(400).json({errors:true,error:error.message})
    }
}

//postData/postBook
exports.postBook = async(req,res)=>{
    try {
        const data = await Book.create(req.body)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:true,error:error.message})
    }
}

//updateData
exports.updateData = async (req,res)=>{
    try {
        const data = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:true,error:error.message})
    }
}

//deleteData
exports.deleteData = async (req,res)=>{
    try {
        const data = await Book.findByIdAndDelete(req.body.id)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(400).json({errors:false,error:error.message})
    }
}