const productSchema = require('../../models/product');
const asyncHandler = require('express-async-handler');
const validateId = require('../../utils/validation/idValidation');
const slugify = require('slugify');
const { validate } = require('../../models/user');



// add new product
// access :Admin

const addProduct = asyncHandler(async(req,res)=>{
    try {
        if( req.body.slug){
            req.body.slug = slugify(req.body.name);
        }
        
        const productExists = await productSchema.findOne({name:req.body.name});
        if(productExists){
            res.json({
                message:'Product Name Already Exists'
            })
        }
        const product = new productSchema({
            ...req.body
        });
        const result = await  product.save();
        res.json({
            message:"product added"
        })
    } catch (error) {
        throw new Error(error)
    }
    
});

// get all products
// access:public
const getAllProducts = asyncHandler(async(req,res)=>{
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page-1) * limit;
    try {
        const [count,data] = await Promise.all([
          productSchema.countDocuments(),
          productSchema.find()
                       .skip(skip)
                       .limit(limit)
                       
        ]);
        if(skip >= count){
             res.json({
                message:'This Page does not exists'
            })
        }
        
        res.json({
            count,
            page,
            data  
        })
    } catch (error) { 
        throw new Error(error)
    }
})


// get a product by id
const getProduct = asyncHandler(async(req,res)=>{
    
    try {
        const {id} = req.params;
        validateId(id);
        const data = await productSchema.findById(id);
        if(!data){
            res.json({
                message:"Product not found"
            })
        }
        res.json({
            data
        })
    } catch (error) {
        throw new Error(error)
    }
});

// update product by id
const updateProduct = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        validateId(id);
       
        if(req.body.name){
            req.body.slug = slugify(req.body.name)
         }
        const result = await productSchema.findByIdAndUpdate(
            id,req.body,
            {new:true}
        );
        res.json({
            message:"product updated"
        })
    } catch (error) {
        throw new Error(error)
    }
});

// delete product by id

const deleteProduct = asyncHandler(async(req,res)=>{
    
    try {
        const {id} = req.params;
        validateId(id);
        const result = await productSchema.findByIdAndDelete(id);
        res.json({
            message:"product deleted"
        })
    } catch (error) {
        throw new Error(error)
    }
});


// search product by name
const searchProduct = asyncHandler(async(req,res)=>{
    const searchQuery = req.query.q || '';
    try{ 

     const count = await productSchema.countDocuments({
        name:{$regex:searchQuery,$options:'i'}
     });
     
     const data = await productSchema.find({
        name:{$regex:searchQuery,$options:'i'}
     });
     
     res.json({
        count,
        data
     })

    }catch(error){
        throw new Error(error)
    }
})



module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}
