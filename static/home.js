$(document).ready(function(){
    $("#get-started-btn").click(function(){
        get_started_btn_click()
    })
})

function get_started_btn_click(){
    console.log("Clicked :)")
    window.location.href = "/get-started"
}