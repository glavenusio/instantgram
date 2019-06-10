<?php 

require_once ('koneksi.php');

$URI = 'http://192.168.1.10:8080/api';

function dp($data){
    print("<pre>".print_r($data,true)."</pre>");
    die();
}

function json($data){
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Mx-Age: 200');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    echo json_encode($data);
}

// find index array of object
function findIndex($array, $toFind, $objectKey){
    foreach($array as $key => $value) {
        if ($value[$objectKey] == $toFind) {
            $foundKey = $key;
            return $foundKey;
        }
    }
    return -1;
}