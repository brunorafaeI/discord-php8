<?php

if (!defined('ROOT_DIR')) {
    define(
        'ROOT_DIR',
        !empty($_SERVER['PWD']) ? $_SERVER['PWD'] : dirname(__DIR__)
    );
}

if (!defined('ASSET_DIR')) {
    define('ASSET_DIR', dirname(__DIR__) . "/web/assets");
}
