<?php

    require_once ('../../config/fungsi.php');

    $username = $_GET['username'];
    $as = $_GET['as'];
    
    $query = mysqli_query($koneksi, "SELECT username FROM user WHERE username LIKE '$username%' AND username NOT LIKE '$as%'");
    $result = [];

    while($d = mysqli_fetch_assoc($query)){
        array_push($result, $d);
    }

    json([
        'result' => $result
    ]);
    