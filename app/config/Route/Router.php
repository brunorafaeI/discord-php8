<?php

namespace Config\Route;

use App\Controllers\AppController;
use App\Controllers\LoginController;
use App\Controllers\UserController;
use App\Controllers\AdminController;

session_start();

abstract class Router extends BaseRouter
{
    public static function routes(): void
    {
        self::register(AdminController::class);
        self::register(UserController::class);
        self::register(LoginController::class);
        self::register(AppController::class);

        self::init();
    }
}
