<?php

namespace Common\Utils;

abstract class StringUtil
{
  public static function toCamelCase(string $str): string
  {
    return lcfirst(str_replace('_', '', ucwords($str, '_')));
  }

  public static function toSnackCase(string $str): string
  {
    return ucfirst(str_replace('_', '', ucwords($str, '_')));
  }
}