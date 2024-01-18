<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Connexion à la base de données
$servername = "localhost";
$dbUsername = "root";
$dbPassword = ""; 
$dbname = "bdd"; 

$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $prenom = $data['prenom'];
    $nom = $data['nom'];
    $email = $data['email'];
    $formation = $data['formation'];
    $niveauEtudes = $data['niveauEtudes'];
    $age = $data['age'];
    $genre = $data['genre'];
    // Récupérer d'autres données du formulaire si nécessaire

    $stmt = $conn->prepare("INSERT INTO informations (prenom, nom, email, formation, niveauEtudes, age, genre) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssis", $prenom, $nom, $email, $formation, $niveauEtudes, $age, $genre);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(array("success" => "Données enregistrées."));
    } else {
        echo json_encode(array("error" => "Erreur lors de l'enregistrement."));
    }

    $stmt->close();
}

$conn->close();
?>
