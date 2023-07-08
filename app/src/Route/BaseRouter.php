<?php

namespace App\Route;

abstract class BaseRouter
{

  public static function getRoute()
  {
    if ($_SERVER['REQUEST_METHOD'] === "GET") {
      echo "Route GET request";
    } else if ($_SERVER['REQUEST_METHOD'] === "POST") {
      echo "Route POST request";
    }
  }

}