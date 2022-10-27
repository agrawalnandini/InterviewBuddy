$(document).ready(function(){
    load_categories_in_dropdown(options = fields, dropdown_id = "#field-options-select")
    load_categories_in_dropdown(options = topics, dropdown_id = "#topic-options-select")
})

function load_categories_in_dropdown(options, dropdown_id){
    $.each(options, function(index, value){
        $("<option value = " + index + ">" + value + "</option>").appendTo(dropdown_id)
    })
}