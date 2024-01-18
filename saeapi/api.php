<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// Connexion à la base de données
$servername = "localhost";
$dbUsername = "root"; // Remplacez par votre nom d'utilisateur de la base de données
$dbPassword = ""; // Remplacez par votre mot de passe de la base de données
$dbname = "bdd"; // Remplacez par le nom de votre base de données

// Créez une connexion
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données envoyées
    $data = json_decode(file_get_contents('php://input'), true);

    if (!is_null($data)) {
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if ($username !== null && $password !== null) {
            // Utiliser une requête préparée pour éviter les injections SQL
            $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                // Les identifiants sont corrects
                echo json_encode(array("success" => "Connexion réussie."));

            } else {
                // Les identifiants sont incorrects
                echo json_encode(array("error" => "Nom d'utilisateur ou mot de passe incorrect."));
            }
            $stmt->close();
        } else {
            echo json_encode(array("error" => "Les données 'username' ou 'password' sont manquantes."));
        }
    } else {
        echo json_encode(array("error" => "Le corps de la requête est vide ou mal formé."));
    }
} else {
    echo json_encode(array("error" => "Méthode de requête non supportée."));
}

$conn->close();
?>
