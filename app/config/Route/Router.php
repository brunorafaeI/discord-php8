<?php

namespace Config\Route;

use FilesystemIterator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

abstract class Router extends BaseRouter
{
    public static function routes(): void
    {
        self::registerControllers();
        self::init();
    }

    private static function registerControllers(): void
    {
        $pathDir = ROOT_DIR . "/src/Controllers";
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator(
                $pathDir,
                FilesystemIterator::SKIP_DOTS
            )
        );

        foreach ($files as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $fileContent = file_get_contents($file->getRealPath());

                preg_match('/namespace\s+(.+);/i', $fileContent, $matches);
                $className = substr($file->getFilename(), 0, -4);
                [,$namespace] = $matches;

                if ($namespace && $className) {
                    self::register($namespace . "\\" . $className);
                }
            }
        }
    }
}
