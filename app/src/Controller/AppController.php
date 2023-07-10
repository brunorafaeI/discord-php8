<?php

namespace App\Controller;

use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Common\Http\AbstractController;
use Common\Utils\ImageUtil;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AppController extends AbstractController
{
  #[Route("/", RouteMethod::GET)]
  public function homePage(Request $request, Response $response): void
  {
    $response->render('home/index.html.twig');
  }
  
  #[Route("/assets", RouteMethod::GET)]
  public function assetsCss(Request $request, Response $response)
  {
    $cssName = $request->get('css');
    $imgName = $request->get('img');
    $jsName = $request->get('js');

    if ($cssName) {
      $cssFile = file_get_contents(ROOT_DIR . "/web/assets/css/{$cssName}.css");
      $response->headers->set('Content-Type', 'text/css');

      return $response->setContent($cssFile)
        ->send();
    }
    
    if ($imgName) {
      $imageExt = ImageUtil::getExtension($imgName);
      $imageFile = file_get_contents(ROOT_DIR . "/web/assets/images/{$imgName}");
      $response->headers->set('Content-Type', $imageExt);

      return $response->setContent($imageFile)
        ->send();
    }

    $jsFile = file_get_contents(ROOT_DIR . "/web/assets/js/{$jsName}.js");
    $response->headers->set('Content-Type', 'text/javascript');

    return $response->setContent($jsFile)
      ->send();

  }
}