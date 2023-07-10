<?php

namespace App\Models;

use Common\Utils\StringUtil;

abstract class BaseModel
{
    public function __construct()
    {
        $args = current(func_get_args());
        $this->validateProperty($args);
    }

    private function validateProperty(array $properties): void
    {
        foreach ($properties as $key => $value) {
            $prop = StringUtil::toCamelCase($key);

            if (!empty($value)) {
                if (property_exists($this, $prop)) {
                    $this->$prop = $value;
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
