$(document).ready(function() {
    $("#sendCommentButton").on("click", function() {
        var comment = $("textarea[name='comment']");
        if (comment.val().length) $("#commentForm").submit();
    });
});