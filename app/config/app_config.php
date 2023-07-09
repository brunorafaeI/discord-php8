<?php

if (!defined('ROOT_DIR')) {
  if (!empty($_SERVER['PWD'])) {
    define('ROOT_DIR', $_SERVER['PWD']);
  } else {
    define('ROOT_DIR', dirname(__DIR__));
  }  
}

if (!defined('ASSET_DIR')) {
    define('ASSET_DIR', dirname(__DIR__) . "/web");
}