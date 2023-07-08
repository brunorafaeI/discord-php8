<?php

require_once __DIR__ . '/vendor/autoload.php';

use Config\Database\Connection;
use App\Entity\UserEntity;
use App\Route\BaseRouter;

$conn = Connection::getInstance();

$stat = $conn->prepare("SELECT * FROM users");
$stat->execute();

$result = $stat->fetchAll(\PDO::FETCH_ASSOC);

dump($result[0]);

if (!empty($result[0])) {
  $user = new UserEntity($result[0]);
  dump($user);
}

