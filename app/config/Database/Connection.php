<?php

namespace Config\Database;

class Connection
{
  private static ?\PDO $instance = null;

  private function __construct()
  {
    $host = 'php_mysql';
    $username = 'root';
    $password = 'admin';
    $dbname = 'labprog';

    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

    try {
        self::$instance = new \PDO($dsn, $username, $password);
        self::$instance->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    } catch (\PDOException $e) {
        die("Failed to connect to database: " . $e->getMessage());
    }

  }

  public static function getInstance(): \PDO
  {
    if (!self::$instance) { new self(); }
    return self::$instance;
  }
}