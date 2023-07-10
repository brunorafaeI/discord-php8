<?php

namespace App\Controller;

use App\Entity\User\UserEntity;
use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Common\Http\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends AbstractController
{
  #[Route("/login", RouteMethod::GET)]
  public function loginIndex(Request $request, Response $response): void
  {
    $response->render('login/index.html.twig');
  }

  #[Route("/login", RouteMethod::POST)]
  public function loginForm(Request $request, Response $response)
  {
    $loginData = json_decode($request->getContent(), true);
    $erroMessage = "Email/password invalidos, tente novamente!";
    
    if (empty($loginData['email']) || empty($loginData['password'])) {
      return $response->json([
        "message" => $erroMessage
      ]);
    }
    
    $repository = $this->getRepository(UserEntity::class);
    $userFound = $repository->findBy([
      "email" => $loginData['email']
    ]);
    
    if (count($userFound)) {
      if ($userFound['password'] !== $loginData['password']) {
        return $response->json([
          "message" => $erroMessage
        ]);
      }
      $_SESSION['user'] = serialize($userFound);
    }
    
    return $response->json($userFound);
  }

  #[Route("/logout", RouteMethod::GET)]
  public function logoutIndex(Request $request, Response $response): void
  {
    session_destroy();
    $response->render('home/index.html.twig');
  }
}