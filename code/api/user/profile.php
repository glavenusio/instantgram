<?php

    require_once ('../../config/fungsi.php');

    $username = $_GET['username'];

    $query = mysqli_query($koneksi, "SELECT * 
        FROM posting p
        JOIN gambar g
            on g.idposting = p.idposting
        WHERE p.username = '$username'
        ORDER BY p.idposting ASC"
    );

    $gallery = [];
    $encode = [];

    while ($result = mysqli_fetch_assoc($query)){
        array_push($gallery, $result);
    }

    // show posts only if ids are different
    // if post have multiple image show only first image
    $tmpcollection = [];
    for($i = 0; $i<count($gallery); $i++ ){
        if(findIndex($tmpcollection, $gallery[$i]['idposting'], 'idposting') == -1){
            $name = $gallery[$i]['idgambar'].'.'.$gallery[$i]['extention'];
            $location = '../post/upload/'.$name;
    
            array_push($tmpcollection, $gallery[$i]);
            array_push($encode, base64_encode( file_get_contents( $location )));
        }
    }

    $gallery = $tmpcollection;

    $query = mysqli_query($koneksi, "SELECT username FROM user WHERE username = '$username'");
    $profile = mysqli_fetch_assoc($query);

    json([
        'gallery' => $gallery,
        'profile' => $profile,
        'encode' => $encode
    ]);