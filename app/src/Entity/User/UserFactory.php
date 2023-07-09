<?php

namespace App\Entity\User;

abstract class UserFactory
{
  public static function getInstanceUser($item)
  {
    return new UserEntity($item);
  }
}