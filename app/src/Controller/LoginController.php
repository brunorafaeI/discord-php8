<?php

namespace App\Controller;

use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Common\Http\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends AbstractController
{
  #[Route("/login", RouteMethod::GET)]
  public function login(Request $request, Response $response): Response
  {
    return $response->setStatusCode(200)
      ->setContent("Welcome to page Login.")
      ->send();
  }
}