<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);

$to = 'rayane.masmoudi13@gmail.com'; // Adresse e-mail de destination (Modifier pour recevoir les mail)
$subject = $data['subject'];
$message = "Nom: " . $data['name'] . "\nE-mail: " . $data['sender'] . "\nMessage: " . $data['message'];
$headers = 'From: ' . $data['sender'];

if(mail($to, $subject, $message, $headers)) {
    echo json_encode(array("success" => "E-mail envoyé avec succès."));
} else {
    echo json_encode(array("error" => "Erreur lors de l'envoi de l'e-mail."));
}
?>
