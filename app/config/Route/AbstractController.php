<?php

namespace Config\Route;

use App\Models\User\UserReadRepository;
use Common\Attributes\Route;
use Common\Enums\RouteMethod;
use Common\Utils\FileUtil;
use Config\Database\Connection;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

abstract class AbstractController
{
    private \PDO $_entity;

    public function __construct()
    {
        $this->_entity = Connection::getInstance();
    }

    public function getManager(?string $manager = 'default'): \PDO
    {
        return $this->_entity;
    }

    public function getRepository(string $class): object
    {
        $repository = null;
        $class = $this->validateClassPath($class);

        try {
            $repository = match ($class) {
                'UserModel' => new UserReadRepository(Connection::getInstance()),
                default => null
            };
        } catch (\InvalidArgumentException $e) {
            dump($e);
        }
        return $repository;
    }

    public function validateClassPath(string $class): string
    {
        $classPath = $class;
        if (!class_exists($classPath)) {
            $classPath = "App\\Models\\" . $classPath;

            if (!class_exists($classPath)) {
                throw new \InvalidArgumentException("Class not found. {$class}");
            }
        }
        return basename(str_replace('\\', '/', $classPath));
    }

    #[Route("/assets", RouteMethod::GET)]
    public function assetIndex(Request $request, Response $response)
    {
        $assetData = $request->query->all();
        $fileType = key($assetData);
        $fileName = current($assetData);

        [$directory, $contentType] = match (key($assetData)) {
            "css" => [sprintf("/css/%s.css", $fileName), FileUtil::getMimeType($fileType)],
            "js" => [sprintf("/js/%s.js", $fileName), FileUtil::getMimeType($fileType)],
            "png" => [sprintf("/images/%s.png", $fileName), FileUtil::getMimeType($fileType)],
            "webp" => [sprintf("/images/%s.webp", $fileName), FileUtil::getMimeType($fileType)],
            "jpeg" => [sprintf("/images/%s.jpeg", $fileName), FileUtil::getMimeType($fileType)],
            "jpg" => [sprintf("/images/%s.jpg", $fileName), FileUtil::getMimeType($fileType)],
            "svg" => [sprintf("/images/icons/%s.svg", $fileName), FileUtil::getMimeType($fileType)],
            default => ['', 'text/html']
        };

        $filePath = ASSET_DIR . $directory;
        $fileContent = file_exists($filePath)
            ? file_get_contents($filePath)
            : "File not found";

        $response->headers->set('Content-Type', $contentType);
        return $response->setContent($fileContent)->send();
    }
}
