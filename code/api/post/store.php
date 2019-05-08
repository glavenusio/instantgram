<?php
    require_once '../../config/fungsi.php';

    $username = $_POST['username'];
    $komen = $_POST['caption'];
    $img = $_POST['images'];
    $postid = -1;
    $validBase64 = [];

    foreach ($img as $key => $value) {
        $img = str_replace('data:image/png;base64,', '',$value);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        
        array_push($validBase64, $data);
    }
    
    mysqli_query($koneksi, "INSERT INTO posting (username, komen) VALUES ('$username',$komen)");
    $postid = mysqli_insert_id($koneksi);
    
    foreach ($validBase64 as $key => $value) {
        mysqli_query($koneksi, "INSERT INTO gambar (idposting, extention) VALUES ('$postid','png')");
        $name = mysqli_insert_id($koneksi);

        $location = './upload/'.$name.'.png';
        file_put_contents($location, $validBase64[$key]);
    }

    json([
        'info' => 'upload photos success',
        'status' => 200,
        'image' => $validBase64
    ]);