$.ajax({
    type: "Get",
    url: "questions.json",
    dataType: "json",
    success: function(data) {
        return runGame(data);
    },
    error: () => alert("didnt work")
})

function runGame(data) {
    console.log(data);
}
