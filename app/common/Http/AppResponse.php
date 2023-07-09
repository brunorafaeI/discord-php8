<?php

namespace Common\Http;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

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
}