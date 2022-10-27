$(document).ready(function(){
    render_gpt_data(data = gpt_prompt, div_id = "#prompt-div", chosen_topic, chosen_field)
    render_gpt_data(data = questions, div_id = "#questions-div", chosen_topic, chosen_field)
    render_categories_in_dropdown(options = questions, dropdown_id = "#questions-options-select")
})

function render_gpt_data(data, div_id, topic, field){
    if (typeof data === 'string'){
        $("<p>"+ topic + " interview questions in the field of " + field + "</p>").appendTo(div_id)
    }

    else{
        $.each(data, function(index, value){
            $("<p>" + value + "</p>").appendTo(div_id)
        })
    }
}

function render_categories_in_dropdown(options, dropdown_id){
    $.each(options, function(index, value){
        $("<option value = " + index + ">" + value + "</option>").appendTo(dropdown_id)
    })
}