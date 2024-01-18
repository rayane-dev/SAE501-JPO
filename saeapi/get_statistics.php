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

// Requête pour les données de formation
$queryFormation = "SELECT formation, COUNT(*) as count FROM informations GROUP BY formation";
$resultFormation = $conn->query($queryFormation);
$dataFormation = array();
while ($row = $resultFormation->fetch_assoc()) {
    array_push($dataFormation, array("formation" => $row['formation'], "count" => (int)$row['count']));
}

// Requête pour les données de niveau d'études
$queryNiveauEtudes = "SELECT niveauEtudes, COUNT(*) as count FROM informations GROUP BY niveauEtudes";
$resultNiveauEtudes = $conn->query($queryNiveauEtudes);
$dataNiveauEtudes = array();
while ($row = $resultNiveauEtudes->fetch_assoc()) {
    array_push($dataNiveauEtudes, array("niveauEtudes" => $row['niveauEtudes'], "count" => (int)$row['count']));
}

// Requête pour le genre
$queryGenre = "SELECT genre, COUNT(*) as count FROM informations GROUP BY genre";
$resultGenre = $conn->query($queryGenre);
$dataGenre = array();
while ($row = $resultGenre->fetch_assoc()) {
    array_push($dataGenre, array("genre" => $row['genre'], "count" => (int)$row['count']));
}


// Requête pour l'Age
$queryAge = "SELECT age, COUNT(*) as count FROM informations GROUP BY age";
$resultAge = $conn->query($queryAge);

$dataAge = array();
while ($row = $resultAge->fetch_assoc()) {
    array_push($dataAge, array("age" => $row['age'], "count" => (int)$row['count']));
}


//Requete pour le nombre de particpant
$queryTotalParticipants = "SELECT COUNT(*) as total FROM informations";
$resultTotalParticipants = $conn->query($queryTotalParticipants);
$totalParticipants = $resultTotalParticipants->fetch_assoc();

echo json_encode(array(
    "formation" => $dataFormation,
    "niveauEtudes" => $dataNiveauEtudes,
    "genre" => $dataGenre,
    "age" => $dataAge,
    "totalParticipants" => (int)$totalParticipants['total']
));

$conn->close();
?>
