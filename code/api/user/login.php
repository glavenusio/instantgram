<?php

    require_once ('../../config/fungsi.php');

    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT * FROM user WHERE username = '$username' AND password = '$password' LIMIT 1";
    $query = mysqli_query($koneksi, $query);

    if($query->num_rows == 0){
        $info['status'] = 401;
        $info['info'] = 'Credential not match';

        json($info);
    }else{
        $result = mysqli_fetch_assoc($query);
        
        $info['status'] = 200;
        $info['data'] = $result;

        json($info);
    }