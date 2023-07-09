<?php

namespace App\Entity\User;

class UserRepository
{
  public function __construct(
    private readonly \PDO $conn
  ) {}
  
  public function findAll(): array
  {
    
    $sql = "
        SELECT
          usr.id,
          usr.name,
          usr.email,
          usr.user_type

        FROM users AS usr
        WHERE usr.email IS NOT NULL
    ";
    
    $sql .= " ORDER BY usr.name ASC";
    
    $stat = $this->conn->prepare($sql);
    
    $stat->execute();    
    $result = $stat->fetchAll(\PDO::FETCH_ASSOC);

    $list = [];
    if (count($result)) {
      foreach ($result as $row) {
        $list[$row['id']] = UserFactory::getInstanceUser($row);
      }
    }

    return $list;
  }
  
  public function find(string $id): ?UserEntity
  {
    if (!$id) { return null; }
    
    $sql = "
        SELECT
          usr.id,
          usr.name,
          usr.email,
          usr.user_type

        FROM users AS usr
        WHERE usr.id = :id
    ";
    
    $sql .= " ORDER BY usr.name ASC";
    
    $stat = $this->conn->prepare($sql);
    $stat->bindValue("id", $id, \PDO::PARAM_INT);
    
    $stat->execute();
    $result = $stat->fetch(\PDO::FETCH_ASSOC);
    
    if ($result) {
      $result = UserFactory::getInstanceUser($result);
    }
    
    return $result;
  }
}