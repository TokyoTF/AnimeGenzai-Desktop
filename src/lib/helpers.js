var Handlebars = require('handlebars');
const helper = {};
const moment = require('moment');

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifExcept', function(arg1) {
    const stris = arg1.filter(r => {return r !== 0});
    return stris
});

Handlebars.registerHelper('moment', function(date) {
    return moment(date).format('DD/MM/YY');
});

module.exports = helper;