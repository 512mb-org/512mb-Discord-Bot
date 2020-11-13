const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MONGODB_URI } = require('./config');

try {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
} catch (err) {
    console.log(err);
}

const guildSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    settings: {
        type: Object,
        require: true
    }
}, { minimize: false });

module.exports = mongoose.model('model', guildSchema);