<?php

namespace Common\Http;

use App\Entity\User\UserRepository;
use Config\Database\Connection;

abstract class AbstractController
{
  private \PDO $_entity;
  
  public function __construct()
  {
    $this->_entity = Connection::getInstance();
  }

  public function getManager(?string $manager = 'default'): \PDO
  {
    return $this->_entity;
  }
  
  public function getRepository(string $class): object
  {
    $repository = null;
    $class = $this->validateClassPath($class);

    try {
      $repository = match ($class) {
        'UserEntity' => new UserRepository(Connection::getInstance()),
        'PostEntity' => new PostRepository(Connection::getInstance()),
        default => null
      };
    } catch (\InvalidArgumentException $e) {
      dump($e);
    }
    return $repository;
  }

  public function validateClassPath(string $class): string
  {
    $classPath = $class;
    if (!class_exists($classPath)) {
      $classPath = "App\\Entity\\" . $classPath;

      if (!class_exists($classPath)) {
        throw new \InvalidArgumentException("Class not found. {$class}");
      }
    }
    return basename(str_replace('\\', '/', $classPath));
  }
}