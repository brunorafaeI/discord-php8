<?php

namespace Common\Util;

abstract class StringUtil
{
  public static function toCamelCase(string $str): string
  {
    return lcfirst(str_replace('_', '', ucwords($str, '_')));
  }
}