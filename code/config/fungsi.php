<?php 

require_once ('koneksi.php');

function dp($data){
    print("<pre>".print_r($data,true)."</pre>");
    die();
}

function json($data){
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    echo json_encode($data);
}