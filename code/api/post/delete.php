<?php

    include_once '../../config/fungsi.php';

    $username = $_GET['username'];
    $idposting = $_GET['idposting'];

    $query = mysqli_query($koneksi, "SELECT * FROM gambar g
        JOIN posting p
            ON p.idposting = g.idposting
        WHERE p.idposting = $idposting
        AND p.username = '$username'
    ");

    while($posting = mysqli_fetch_assoc($query)){
        $location = './upload/'.$posting['idgambar'].'.'.$posting['extention'] ;
        unlink($location);
    }
    
    mysqli_query($koneksi, "DELETE FROM gambar WHERE idposting = $idposting");
    mysqli_query($koneksi, "DELETE FROM posting WHERE idposting = $idposting");
    
    json([
        'status' => 200,
        'info' => 'post removed successfully'
    ]);