$(document).ready(function(){
    load_categories_in_dropdown(options = fields, dropdown_id = "#field-options-select")
    load_categories_in_dropdown(options = topics, dropdown_id = "#topic-options-select")
    $("#generate-questions-btn").click(function(){
        generate_questions_btn_click()
    })
})

function load_categories_in_dropdown(options, dropdown_id){
    $.each(options, function(index, value){
        $("<option value = " + index + ">" + value + "</option>").appendTo(dropdown_id)
    })
}

function generate_questions_btn_click(){
    let field_index = $("#field-options-select").val()
    let topic_index = $("#topic-options-select").val()
    user_choice = {
        "field_index" : field_index,
        "topic_index" : topic_index
    }
    $.ajax({
        type: "POST",
        url: "/generateQuestions",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user_choice),
        beforeSend: function(){
            console.log("BEFORE SEND")
            $("#loading-div").show()
            $("#default-div").hide()
           },
        success: function(result){
            console.log(result)
            $("#loading-div").hide()
        },
        error: function(result){
            console.log(result['responseText'])
            console.log("Status:", result['status'])
        }
    })
}