<?php

namespace App\Controllers;

use Common\Attributes\Get;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TestController
{
    #[Get("/test")]
    public function testIndex(Request $request, Response $response)
    {
        return $response->json([ "message" => "hello test"]);
    }
}
