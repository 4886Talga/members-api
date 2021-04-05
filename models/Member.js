const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
   
    name: {
        type: String        
    },
    office : {
        type: String
    },
    contact: {
        //Array of strings
        type: [String],
        enum: ['Twitter', 'GitHub', 'LinkedIn']
    },
    image : {
        type: String
    }
})

module.exports = mongoose.model('Member', MemberSchema);
