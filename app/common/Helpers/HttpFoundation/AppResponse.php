<?php

namespace Common\Helpers\HttpFoundation;

use Config\Asset\AssetFileReader;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Loader\FilesystemLoader;

class AppResponse extends Response
{
    private readonly Serializer $_serializer;

    public function __construct(
        ?string $content = '',
        int $status = 200,
        array $headers = []
    ) {
        parent::__construct($content, $status, $headers);
        $this->_serializer = new Serializer(
            [new ObjectNormalizer()],
            [new JsonEncoder()]
        );
    }

    public function json(mixed $data): AppResponse
    {
        $jsonData = $this->_serializer->serialize($data, 'json');

        $this->setContent($jsonData);
        $this->headers->set('Content-Type', 'application/json');

        return $this->send();
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function render(string $template, ?array $variables = [])
    {
        $loader = new FilesystemLoader(ROOT_DIR . '/src/Views');
        $twig = new Environment($loader);

        $user = unserialize($_SESSION['user'] ?? "");
        $icons = AssetFileReader::getAllIcons();

        echo $twig->render(
            $template,
            array_merge($variables, ['user' => $user, 'icons' => $icons])
        );
    }
}
