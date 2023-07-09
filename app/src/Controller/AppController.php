<?php

namespace App\Controller;

use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Common\Http\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AppController extends AbstractController
{
  #[Route("/", RouteMethod::GET)]
  public function homePage(Request $request, Response $response)
  {
    $template = file_get_contents(ROOT_DIR . '/web/views/home/index.php');
    return $response->setContent($template)
      ->send();
  }
}