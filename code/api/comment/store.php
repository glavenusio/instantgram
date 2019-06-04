<?php
    require_once '../../config/fungsi.php';

    $idposting = $_POST['idposting'];
    $username = $_POST['username'];
    $isi_komen = $_POST['isi_komen'];
    
    mysqli_query($koneksi, "INSERT INTO balasan_komen (idposting, username, isi_komen) 
                            VALUES ($idposting, '$username', '$isi_komen')");
    $comment_collection = [];
    $query = mysqli_query($koneksi, "SELECT * FROM balasan_komen WHERE idposting = $idposting");
    while($result = mysqli_fetch_assoc($query)){
        array_push($comment_collection, $result);
    }

    $info['comments'] = $comment_collection;

    json($info);