<?php

namespace App\Entity;

use Common\Utils\StringUtil;

abstract class BaseEntity
{
  public function __construct()
  {
    $args = current(func_get_args());
    $this->validateProperty($args);
  }

  private function validateProperty($properties): void
  {
    if (is_array($properties)) {

      foreach ($properties as $key => $value) {
        $prop = StringUtil::toCamelCase($key);
  
        if (!empty($value)) {
          if (property_exists($this, $prop)) {
            $this->$prop = $value;
          }
        }
      }
    }
  }

  public function __call($method, $params)
  {
    $prop = str_replace('get', '', ucwords($method));
    if (property_exists($this, $prop)) {
      return $this->$prop;
    }
    return false;
  }
}