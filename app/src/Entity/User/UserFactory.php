<?php

namespace App\Entity\User;

abstract class UserFactory
{
  public static function _formElement($item)
  {
    return new UserEntity($item);
  }
}