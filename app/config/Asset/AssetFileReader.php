<?php

namespace Config\Asset;

class AssetFileReader
{
    public function readCssFile(string $cssName): string
    {
        return file_get_contents(ASSET_DIR . "/css/{$cssName}.css");
    }

    public function readJsFile(string $jsName): string
    {
        return file_get_contents(ASSET_DIR . "/js/{$jsName}.js");
    }

    public static function getAllIcons(): array
    {
        $icons = [];
        $files = glob(ASSET_DIR . "/images/icons/*.svg");

        foreach ($files as $file) {
            $filename = pathinfo($file, PATHINFO_FILENAME);
            $content = file_get_contents($file);

            $icons[$filename] = $content;
        }

        return $icons;
    }
}
