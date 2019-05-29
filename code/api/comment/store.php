<?php
    require_once '../../config/fungsi.php';

    $idposting = $_POST['idposting'];
    $username = $_POST['username'];
    $isi_komen = $_POST['isi_komen'];
    
    mysqli_query($koneksi, "INSERT INTO balasan_komen (idposting, username, isi_komen) 
                            VALUES ($idposting, '$username', '$isi_komen')");

    
