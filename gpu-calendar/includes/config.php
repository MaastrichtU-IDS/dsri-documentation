<?php
$app_title = "DSRI GPU reservation";


//Please fill in the servername, username, password and database
//mysql settings
$servername = "getenv('DB_HOST') ?: 'localhost'";
$dbusername = "getenv('DB_USER') ?: 'dsri-user'";
$dbpassword = getenv('DB_PASSWORD');
$database = "getenv('DB_NAME') ?: 'dsri-db'";

  // Create connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $database);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 


?>
