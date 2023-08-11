<?php

namespace App\Controllers;

use App\Models\User\UserModel;
use Common\Attributes\Get;
use Common\Attributes\Post;
use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Config\Route\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
    #[Get("/users")]
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

    #[Post("/users/register")]
    public function userRegister(Request $request, Response $response)
    {
        $userData = json_decode($request->getContent(), true);
        dump($userData);
    }

    #[Get("/users/profile")]
    public function userProfile(Request $request, Response $response): void
    {
        $response->render('user/profile/index.html.twig');
    }
}
