<?php

if (!defined('ROOT_DIR')) {
  if (!empty($_SERVER['PWD'])) {
    define('ROOT_DIR', $_SERVER['PWD']);
  } else {
    define('ROOT_DIR', dirname(__DIR__));
  }  
}