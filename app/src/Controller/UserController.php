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
  public function getUser(Request $request, Response $response): Response
  {
    $repository = $this->getRepository(UserEntity::class);
    $userFound = $repository->find(1);

    return $response->setStatusCode(200)->json($userFound);
  }

  #[Route("/users", RouteMethod::POST)]
  public function createUser(Request $request, Response $response): Response
  {
    $repository = $this->getRepository(UserEntity::class);
    $userFound = $repository->findAll();

    return $response->setStatusCode(200)->json($userFound);
  }
}