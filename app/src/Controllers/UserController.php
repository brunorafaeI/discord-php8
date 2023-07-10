<?php

namespace App\Controllers;

use App\Models\User\UserModel;
use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Config\Route\AbstractController;
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

        try {
            $repository = $this->getRepository(UserModel::class);
            $userFound = $repository->find($idUser);
        } catch (\Exception $e) {
            throw new \HttpException($e->getMessage());
        }

        return $response->setStatusCode(200)->json($userFound);
    }

    #[Route("/users/register", RouteMethod::POST)]
    public function userRegister(Request $request, Response $response)
    {
        $userData = json_decode($request->getContent(), true);
        dump($userData);
    }

    #[Route("/users/profile", RouteMethod::GET)]
    public function userProfile(Request $request, Response $response): void
    {
        $response->render('user/profile/index.html.twig');
    }
}
