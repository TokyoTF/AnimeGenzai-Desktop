var $ = require('jquery')
require('multiple-select')
$(function () {
    $('select').multipleSelect({
        multiple: true,
        width: 500,
        multipleWidth: 70,
        dropWidth: 580,
        selectAll: false
    })
})

$(".next").click(function() {
    $.post("/page/" + 1,function(r) {
        
    })
})