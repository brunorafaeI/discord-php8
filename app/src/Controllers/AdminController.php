<?php

namespace App\Controllers;

use Common\Attributes\Get;
use Config\Route\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends AbstractController
{
    #[Get("/admin")]
    public function adminIndex(Request $request, Response $response)
    {
        $response->render('admin/index.html.twig');
    }
}
