const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;

const RecordSchema = new mongoose.Schema({
    record_type: {
        type: String,
        required: 'Type either income or expense'
    },
    description: {
        type: String,
        required: 'Description cannot be empty'
    },
    value: {
        type: SchemaTypes.Double,
        required: 'Amount is required'
    },
    percentage: Number,
    month: {
        type: Date,
        default: Date.now
    }
})

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;