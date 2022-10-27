$(document).ready(function(){
    render_gpt_data(data = gpt_prompt, div_id = "#prompt-div", chosen_topic, chosen_field)
    render_gpt_data(data = questions, div_id = "#questions-div", chosen_topic, chosen_field)
    render_categories_in_dropdown(options = questions, dropdown_id = "#questions-options-select")
    $("#answer-question-btn").click(function(){
        answer_question_btn_click()
    })
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
        $("<option value = '" + value + "'>" + value + "</option>").appendTo(dropdown_id)
    })
}

function answer_question_btn_click(){
    let chosen_question = $("#questions-options-select").val()
    user_choice = {
        "chosen_question" : chosen_question
    }
    $.ajax({
        type: "POST",
        url: "/store_user_data",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user_choice),
        success: function(result){
            console.log("Success")
        },
        error: function(result){
            console.log(result['responseText'])
            console.log("Status:", result['status'])
        }
    })
}