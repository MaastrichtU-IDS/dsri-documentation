<?php
$app_title = "DSRI GPU reservation";

// Never show PHP errors to visitors; they go to the server/container log instead
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// mysql settings
$servername = getenv('DB_HOST') ?: 'mysql';
$dbusername = getenv('DB_USER') ?: 'dsri-user';
$dbpassword = getenv('DB_PASSWORD');
$database = getenv('DB_NAME') ?: 'dsri-db';

// Create connection. Since PHP 8.1 mysqli throws an exception on failure
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try {
  $conn = new mysqli($servername, $dbusername, $dbpassword, $database);
} catch (mysqli_sql_exception $e) {
  error_log("GPU calendar: DB connection failed: " . $e->getMessage());
  http_response_code(503);
  die("The GPU calendar is temporarily unavailable. Please try again later.");
}