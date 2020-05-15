<?php
$imgs = dir("../images");
$images = array();
while (($img = $imgs->read()) !== false) {
    if (strlen($img) > 5) {
        array_push($images, $img);
    }
}
$imagesJSON = json_encode($images);
echo $imagesJSON;