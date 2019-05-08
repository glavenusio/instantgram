<?php
    require_once '../../config/fungsi.php';

    $username = $_GET['username'];
    $idposting = $_GET['idposting'];

    $query = mysqli_query($koneksi, "SELECT * 
        FROM user u
        JOIN posting p
            on p.username = u.username
        JOIN gambar g
            on g.idposting = p.idposting
        WHERE u.username = '$username' AND p.idposting = $idposting"
    );

    $img_previews = [];
    while($result = mysqli_fetch_assoc($query)){
        $file = 'upload/'.$result['idgambar'].'.'.$result['extention'];
        array_push($img_previews, base64_encode( file_get_contents($file) ) );
    }

    $query = mysqli_query($koneksi, "SELECT * FROM posting WHERE idposting = $idposting");
    $post_info = mysqli_fetch_assoc($query);

    $data['post_info'] = $post_info;
    $data['img_previews'] = $img_previews;

    json($data);
