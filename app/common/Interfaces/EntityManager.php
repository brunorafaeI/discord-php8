<?php

namespace Common\Interfaces;

interface EntityManager
{
  public function getRepository(string $class): object;
}