<?php

    require_once ('../../config/fungsi.php');

    $username = $_GET['username'];

    $query = mysqli_query($koneksi, "SELECT * 
        FROM user u
        JOIN posting p
            on p.username = u.username
        JOIN gambar g
            on g.idposting = p.idposting
        WHERE u.username = '$username'"
    );

    $gallery = [];
    $encode = [];

    $tmp_id = -1;
    while ($result = mysqli_fetch_assoc($query)){
        if($result['idposting'] != $tmp_id){
            $name = $result['idgambar'].'.'.$result['extention'];
            $location = '../post/upload/'.$name;

            array_push($gallery, $result);
            array_push($encode, base64_encode( file_get_contents( $location )));
        }
            
        $tmp_id = $result['idposting'];
    }
    
    $query = mysqli_query($koneksi, "SELECT username FROM user WHERE username = '$username'");
    $profile = mysqli_fetch_assoc($query);

    json([
        'gallery' => $gallery,
        'profile' => $profile,
        'encode' => $encode
    ]);