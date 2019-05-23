<?php
    $username = 'root';
    $password = 'root';
    $hostname = '172.17.0.1:3306'; // docker port
    $database = 'instantgram_v2';

    $koneksi = mysqli_connect($hostname, $username, $password, $database);