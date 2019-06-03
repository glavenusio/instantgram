<?php
    $username = 'root';
    $password = 'root';
    $hostname = '172.17.0.1:3306';
    $database = 'instantgram';

    $koneksi = mysqli_connect($hostname, $username, $password, $database);