<?php

namespace App\Controllers;

use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Config\Route\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AppController extends AbstractController
{
    #[Route("/", RouteMethod::GET)]
    public function homeIndex(Request $request, Response $response): void
    {
        $response->render('home/index.html.twig');
    }
}
