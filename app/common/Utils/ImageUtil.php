<?php

namespace Common\Utils;

abstract class ImageUtil
{
  public static function getExtension(string $imgName): ?string
  {
    $imgExt = explode(".", $imgName);

    return match ($imgExt[1]) {
      'svg' => 'image/svg+xml',
      'png' => 'image/png',
      'webp' => 'image/webp',
      default => 'image/jpeg'
    };
  }
}