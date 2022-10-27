$(document).ready(function(){
    render_chosen_question(data = chosen_question, div_id = "#chosen-question-div")
})


function render_chosen_question(data, div_id){
    $("<p>" + data + "</p>").appendTo(div_id)
}