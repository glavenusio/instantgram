<?php

    require_once ('../../config/fungsi.php');

    $query = mysqli_query($koneksi, "SELECT * FROM user");

    $all = [];

    while ($result = mysqli_fetch_assoc($query)){
        array_push($all, $result);
    }
    
    json([
        'all' => $all,
    ]);