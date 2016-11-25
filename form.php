<?php

if (isset($_POST['submit'])) {
    header('Location: /');
}

$name = htmlspecialchars(trim($_POST["name"]));
$number = htmlspecialchars(trim($_POST["number"]));
$email = htmlspecialchars(trim($_POST["email"]));
$comment = htmlspecialchars(trim($_POST["comment"]));

$recipient = "hazardous333@gmail.com";
$title = "Сообщение с сайта";
$message = "Имя: $name\nОтправитель: $email\nТелефон: $number";

if (!empty($comment)) {
    $message .= "\nКомментарий: $comment";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $arr = array('status' => 'error_mail');
    print_r(json_encode($arr));
} elseif (empty($name) or empty($number) or empty($email)) {
    $arr = array('status' => 'error_string');
    print_r(json_encode($arr));
} elseif (mail($recipient, $title, $message)) {
    $arr = array('status' => 'success');
    print_r(json_encode($arr));

    $fp = fopen('log.txt', 'a');
    $date = date('c');
    $message = "Дата: $date, Отправитель: $name, Email: $email, Телефон: {$number};\n";

    if (!empty($comment)) {
        $message = "Дата: $date, Отправитель: $name, Email: $email, Телефон: $number, Комментарий: {$comment};\n";
    }

    fwrite($fp, $message);
    fclose($fp);
}
