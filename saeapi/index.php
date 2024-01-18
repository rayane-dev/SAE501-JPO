<!DOCTYPE html>
<html>
<head>
    <title>Formulaire de Connexion</title>
</head>
<body>

<h2>Connexion</h2>

<?php
// Code PHP pour gérer la soumission du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? null;
    $password = $_POST['password'] ?? null;

    if ($username !== null && $password !== null) {
        // Créez une connexion à la base de données (utilisez votre propre code de connexion)
        $servername = "localhost";
        $dbUsername = "root"; // Remplacez par votre nom d'utilisateur de la base de données
        $dbPassword = ""; // Remplacez par votre mot de passe de la base de données
        $dbname = "bdd"; // Remplacez par le nom de votre base de données

        $conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

        // Vérifiez la connexion
        if ($conn->connect_error) {
            die("Échec de la connexion : " . $conn->connect_error);
        }

        // Préparez la requête SQL pour vérifier l'existence de l'utilisateur avec les identifiants donnés
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");

        // Remplacez '?' par les identifiants d'utilisateur
        $stmt->bind_param("ss", $username, $password);

        // Exécutez la requête
        $stmt->execute();

        // Stockez le résultat pour vérifier si les lignes existent
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // Les identifiants sont corrects
            echo "Connexion réussie.";
            // Redirigez l'utilisateur vers une page de réussite ou effectuez d'autres actions ici
        } else {
            // Les identifiants sont incorrects
            echo "Nom d'utilisateur ou mot de passe incorrect.";
        }

        // Fermez la déclaration et la connexion
        $stmt->close();
        $conn->close();
    } else {
        echo "Les données 'username' ou 'password' sont manquantes.";
    }
}
?>

<form method="POST" action="">
    <label for="username">Nom d'utilisateur :</label><br>
    <input type="text" id="username" name="username" required><br><br>

    <label for="password">Mot de passe :</label><br>
    <input type="password" id="password" name="password" required><br><br>

    <input type="submit" value="Se connecter">
</form>

</body>
</html>
