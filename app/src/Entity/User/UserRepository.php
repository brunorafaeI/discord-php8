<?php

namespace App\Entity\User;

class UserRepository
{
  public function __construct(
    private readonly \PDO $conn
  ) {}
  
  public static function getColumnSQL(): string
  {
    return "
      usr.id,
      usr.name,
      usr.email,
      usr.password,
      usr.user_type as userType
    ";
  }
  
  public function findAll(): array
  {
    
    $sql = sprintf("
        SELECT
          %s
        
        FROM users AS usr
        WHERE usr.email IS NOT NULL
    ",
      self::getColumnSQL()
    );
    
    $sql .= " ORDER BY usr.name ASC";
    
    $stat = $this->conn->prepare($sql);
    
    $stat->execute();    
    $result = $stat->fetchAll(\PDO::FETCH_ASSOC);

    $list = [];
    if (count($result)) {
      foreach ($result as $row) {
        $list[$row['id']] = $row;
      }
    }

    return $list;
  }
  
  public function find(string $id): ?array
  {
    if (!$id) { return null; }
    
    $sql = sprintf("
        SELECT
          %s

        FROM users AS usr
        WHERE usr.id = :id
    ",
      self::getColumnSQL()
    );
    
    $sql .= " ORDER BY usr.name ASC";
    
    $stat = $this->conn->prepare($sql);
    $stat->bindValue("id", $id, \PDO::PARAM_INT);
    
    $stat->execute();
    $query = $stat->fetch(\PDO::FETCH_ASSOC);

    $result = [];
    if ($query) {
      $result = $query;
    }

    return $result;
  }

  public function findBy(array $criteria): ?array
  {

    $sql = sprintf("
        SELECT
          %s

        FROM users AS usr
        WHERE usr.name IS NOT NULL
    ",
      self::getColumnSQL()
    );
    
    if (!empty($criteria['name'])) {
      $sql .= " AND usr.name LIKE :name";
    }

    if (!empty($criteria['id'])) {
      $sql .= " AND usr.id = :id";
    }

    if (!empty($criteria['email'])) {
      $sql .= " AND usr.email = :email";
    }
    
    $sql .= " ORDER BY usr.name ASC";

    $stat = $this->conn->prepare($sql);
    
    if (!empty($criteria['id'])) {
      $stat->bindValue("id", $criteria['id'], \PDO::PARAM_INT);
    }

    if (!empty($criteria['name'])) {
      $stat->bindValue("name", $criteria['name']);
    }

    if (!empty($criteria['email'])) {
      $stat->bindValue("email", $criteria['email']);
    }
    
    $stat->execute();
    $query = $stat->fetch(\PDO::FETCH_ASSOC);

    $result = [];
    if ($query) {
      $result = $query;
    }
    
    return $result;
  }
}