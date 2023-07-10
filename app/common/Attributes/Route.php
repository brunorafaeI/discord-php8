<?php

namespace Common\Attributes;

use Common\Enums\RouteMethod;

#[\Attribute(\Attribute::TARGET_METHOD)]
readonly class Route
{
    public function __construct(
        private string $path,
        private RouteMethod $method
    ) {
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getMethod(): string
    {
        return $this->method->name;
    }
}
