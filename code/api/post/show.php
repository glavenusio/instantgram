<?php
    require_once '../../config/fungsi.php';

    $username = $_GET['username'];
    $idposting = $_GET['idposting'];
    $on = $_GET['on'];

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
        $name = $result['idgambar'].'.'.$result['extention'];
        $file = 'upload/'.$name;

        array_push($img_previews, $URI.'/post/upload/'.$name);
        // array_push($img_previews, base64_encode(file_get_contents($file)));
    }

    $query = mysqli_query($koneksi, "SELECT * FROM posting WHERE idposting = $idposting");
    $post_info = mysqli_fetch_assoc($query);
    
    $comment_collection = [];
    $query = mysqli_query($koneksi, "SELECT * FROM balasan_komen WHERE idposting = $idposting");
    while($result = mysqli_fetch_assoc($query)){
        array_push($comment_collection, $result);
    }
    
    $query = mysqli_query($koneksi, "SELECT * FROM jempol_like WHERE idposting = $idposting");
    $likes = mysqli_num_rows($query);
    
    $query = mysqli_query($koneksi, "SELECT * FROM jempol_like WHERE idposting = $idposting AND username = '$on'");
    $result = mysqli_num_rows($query);
    $liked = $result == 1 ? true : false;

    $data['post_info'] = $post_info;
    $data['img_previews'] = $img_previews;
    $data['likes'] = $likes;
    $data['liked'] = $liked;
    $data['comments'] = $comment_collection;

    json($data);
