$(document).ready(function(){
    render_chosen_question(data = chosen_question, div_id = "#chosen-question-div")
    $("#get-feedback-btn").click(function(){
        get_feedback_btn_click()
    })
})

function render_chosen_question(data, div_id){
    $("<p>" + data + "</p>").appendTo(div_id)
}

function get_feedback_btn_click(){
    let user_answer = $("#user-answer-text-area").val()
    user_data = {
        "user_answer" : user_answer
    }
    $.ajax({
        type: "POST",
        url: "/store_user_data",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user_data),
        beforeSend: function(){
            $("#loading-div").show()
            $("#default-div").hide()
           },
        success: function(result){
            // $("#loading-div").hide()
            window.location.href = "/evaluateAnswer"
        },
        error: function(result){
            console.log(result['responseText'])
            console.log("Status:", result['status'])
        }
    })
}