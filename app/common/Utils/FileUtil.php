<?php

namespace Common\Utils;

abstract class FileUtil
{
    public static function getMimeType(string $fileType): ?string
    {
        return match ($fileType) {
            'css' => 'text/css',
            'svg' => 'image/svg+xml',
            'png' => 'image/png',
            'webp' => 'image/webp',
            'js', 'mjs' => 'text/javascript',
            'jpeg', 'jpg' => 'image/jpeg',
            'html', => 'text/html',
            default => ''
        };
    }
}
