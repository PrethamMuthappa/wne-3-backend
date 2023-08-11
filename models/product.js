const {Schema,model, default: mongoose} = require('mongoose');


const productSchema = new Schema({
    name:{type:String,required:true,trim:true,unique:true},
    slug:{type:String,lowercase:true},
    description:{type:String},
    price:{type:Number,required:true},
    sellingPrice:{type:Number},
    category:{type:String,ref:'category'},
    subCategory:{type:String,ref:'sub category'},
    brand:{type:String},
    availability: {
        inStock: Boolean,
        stockQuantity: Number,
        expectedRestockDate: Date
    },
    images:{type:Array},
    isActive:{type:Boolean,default:true},
    color:{type:String,enum:["Black","Brown","white","red"]},
    ratings:[{
        text:String,
        stars:Number,
        postedBy:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        createdAt:Date
    }],

},{
    timestamps:true
});

productSchema.method('toJSON',function(){
    const {
        _id, __v, ...object 
      } = this.toObject();
      object.id = _id;
         
      return object;
},{versionKey:false})

module.exports = model('product',productSchema);