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
moment.updateLocale('es', {
    relativeTime : {
        future: "en %s",
        past:   "%s atras",
        s  : 'unos segundos',
        ss : '%d segundos',
        m:  "un minuto",
        mm: "%d minutos",
        h:  "una hora",
        hh: "%d horas",
        d:  "un dia",
        dd: "%d dias",
        w:  "una semana",
        ww: "%d semanas",
        M:  "un mes",
        MM: "%d meses",
        y:  "un año",
        yy: "%d años"
    }
});
Handlebars.registerHelper('moment', function(date) {
   
    return moment(date).fromNow(true);  
});
Handlebars.registerHelper('year', function(date) {
    return moment(date).format('YYYY');
})

Handlebars.registerHelper('compare', function(data) {
    if(data.includes('/movie/')){
        return 'movie'
    }
    if(data.includes('/serie/')){
        return 'anime'
    }
    
})

module.exports = helper;