<?php

namespace App\Entity\User;

use App\Entity\BaseEntity;

class UserEntity extends BaseEntity
{
  public $id;
  public $name;
  public $email;
  public $userType;
}