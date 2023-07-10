<?php

namespace App\Services\Search;

use Algolia\AlgoliaSearch\SearchClient;

class AlgoliaClient
{
    private readonly SearchClient $client;
    private const ALGOLIA_APP_ID = "5KBNAYFIHI";
    private const ALGOLIA_API_KEY = "350ebe5e028c0dbe472b9c22373b460c";

    public function __construct()
    {
        $this->client = SearchClient::create(
            self::ALGOLIA_APP_ID,
            self::ALGOLIA_API_KEY
        );
    }

    public function connect()
    {
        $index = $this->client->initIndex('search_events');
        dump($index);
    }

}

$algoliaCLient = new AlgoliaClient();
$algoliaCLient->connect();
