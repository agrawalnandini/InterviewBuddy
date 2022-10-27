$(document).ready(function(){
    render_data(data = chosen_question, div_id = "#report-chosen-question-div")
    render_data(data = user_answer, div_id = "#report-user-answer-div")
    render_data(data = return_data.feedback, div_id = "#report-feedback-div")
    render_data(data = return_data.keywords, div_id = "#report-keyword-analysis-div")
})

function render_data(data, div_id){
    $("<p>" + data + "</p>").appendTo(div_id)
}