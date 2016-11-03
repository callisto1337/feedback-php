$(document).ready(function () {
    $("#form").submit(function () {
        var test_mail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        var error_server = "Произошла ошибка, попробуйте повторить позднее";
        var error_mail = "Указанный адрес Email некорректен";
        var error_string = "Проверьте правильность вводимых данных";

        if (!$("#name").val().trim()) {
            $("#name").focus();
        }
        else if (!$("#number").val().trim()) {
            $("#number").focus();
        }
        else if (!$("#email").val().trim()) {
            $("#email").focus();
        }
        else if (!test_mail.test($("#email").val())) {
            $("#email").focus();
            $("#succes").css("display", "none");
            $("#error").css("display", "block").html(error_mail);
        }
        else {
            $("#sending").css("display", "block");
            $("#error").css("display", "none");
            $("#succes").css("display", "none");

            $.ajax({
                url: "form.php",
                type: "POST",
                data: {
                    name: $("#name").val(),
                    number: $("#number").val(),
                    comment: $("#comment").val(),
                    email: $("#email").val()
                },
                success: function (resp) {
                    resp = JSON.parse(resp);

                    if (resp['status'] === "success") {
                        $("#error").css("display", "none");
                        $("#sending").css("display", "none");
                        $("#succes").css("display", "block");
                        $("#form").trigger("reset");
                    }
                    else if (resp['status'] === "error_mail") {
                        $("#email").focus();
                        $("#error").css("display", "block").html(error_mail);
                        $("#sending").css("display", "none");
                        $("#succes").css("display", "none");
                    }
                    else if (resp['status'] === "error_string") {
                        $("#error").css("display", "block").html(error_string);
                        $("#sending").css("display", "none");
                        $("#succes").css("display", "none");
                    }
                },
                error: function () {
                    $("#error").css("display", "block").html(error_server);
                    $("#sending").css("display", "none");
                    $("#succes").css("display", "none");
                }
            });
        }

        return false;
    });
});