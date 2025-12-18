import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
    firstname: {
           type: String,
           required: true
        },

    secondname: {
           type: String,
           required: true
        },
        
    email: {
           type: String,
           required: true
        },   
        
    message: {
           type: String,
           required: true
        },    
  
},
        {
           timestamps: true
        }
)
export const Contact = mongoose.model('Contact', ContactSchema);