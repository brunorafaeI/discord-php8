<?php

namespace App\Controller;

use App\Entity\User\UserEntity;
use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Common\Http\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
  #[Route("/users", RouteMethod::GET)]
  public function userIndex(Request $request, Response $response): Response
  {
    $idUser = $request->get('idUser');

    if (!$idUser) {
      throw new \InvalidArgumentException("Invalid idUser parameter.");
    }

    $repository = $this->getRepository(UserEntity::class);
    $userFound = $repository->find($idUser);

    return $response->setStatusCode(200)->json($userFound);
  }

  #[Route("/users/profile", RouteMethod::GET)]
  public function userProfile(Request $request, Response $response): void
  {
    $response->render('user/profile/index.html.twig');
  }
}