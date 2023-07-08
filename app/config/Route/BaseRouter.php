<?php

namespace App\Route;

abstract class BaseRouter
{
  protected static $routes = [];

  public static function get($path, $callback)
  {
    self::$routes['GET'][$path] = $callback;
  }

  public static function post($path, $callback)
  {
    self::$routes['POST'][$path] = $callback;
  }

  public static function init()
  {
    $method = $_SERVER['REQUEST_METHOD'];
    $request_uri = $_SERVER['REQUEST_URI'];

    if (isset(self::$routes[$method])) {
      $router = self::$routes[$method];

      foreach ($router as $path => $callback) {
        if ($request_uri === $path) {

          if (is_callable($callback)) {
            $callback();
          }

          if (is_array($callback)) {
            self::handleCallback($callback);
          }

        } else if (is_string($callback)) {
          $parts = explode('@', $callback);
          self::handleCallback($parts);
        } 
      }
    } else {
      echo "404 - Not Found";
    }
    
  }

  private static function handleCallback($callback)
  {
    if (is_array($callback)) {
      $controllerName = $callback[0];
      $methodName = $callback[1];

      if (class_exists($controllerName)) {
        $controller = new $controllerName();

        if (method_exists($controller, $methodName)) {
          $controller->$methodName();
        }
      }
    }
  }

}