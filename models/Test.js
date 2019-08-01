var mongoose = require('mongoose');
var TestSchema = mongoose.Schema({
    test_name:{
        type:String,
        require:true
    },
    max_score:{
        type:String,
        require:true
    },
    question:[
        {
          question:{  
              type:Schema.Types.ObjectId,
              ref:"Question"
          }
        }
    ]
});

module.exports = Test = mongoose.model('Test',TestSchema);
