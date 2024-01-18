<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$dbUsername = "root";
$dbPassword = ""; 
$dbname = "bdd"; 

$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

$query = "SELECT prenom, nom, age, genre, email, formation, niveauEtudes FROM informations";
$result = $conn->query($query);

$participants = array();
while ($row = $result->fetch_assoc()) {
    array_push($participants, $row);
}

echo json_encode($participants);

$conn->close();
?>
