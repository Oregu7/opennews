$(document).ready(function() {
    $("#sendPostButton").on("click", function() {
        var title = $("input[name='title']");
        var author = $("input[name='author']");
        var image = $("input[name='image']");
        var text = $("textarea[name='text']");
        if (title.val().length && author.val().length && image.val().length && text.val().length)
            $("#postForm").submit();
    });
});