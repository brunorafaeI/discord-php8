<?php

namespace Config\Route;

use App\Controller\AppController;
use App\Controller\LoginController;
use App\Controller\UserController;

abstract class Router extends BaseRouter
{
  public static function routes(): void
  {
    self::register(UserController::class);
    self::register(LoginController::class);
    self::register(AppController::class);
    
    self::init();
  }
}