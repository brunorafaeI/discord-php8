<?php

namespace Common\Attributes;

use Common\Enums\RouteMethod;

#[\Attribute(\Attribute::TARGET_METHOD)]
class Post extends Route
{
    public function __construct(
        private string $path
    ) {
        parent::__construct(
            path: $this->path,
            method: RouteMethod::POST
        );
    }
}
