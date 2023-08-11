<?php

namespace Common\Utils;

abstract class MetricUtil
{
    public static function getPerformance(callable $func)
    {
        $start_time = microtime(true);
        $start_memory = memory_get_usage();

        $func();

        $duration = abs(microtime(true) - $start_time);
        $memory_used = abs(memory_get_usage() - $start_memory);

        return [
            "duration" => $duration,
            "memory_used" => $memory_used
        ];
    }
}
