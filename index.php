<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
<title>IP Herring</title>
<style type="text/css">
	html,body{
		border:none; padding:0; margin:0;
		background:#FFFFFF;
		color:#202020;
	}
	body{
		text-align:center;
		font-family:"Roboto",sans-serif;
	}
	h1{
		color:#404040;
	}
	img{
        width: 25%;
    }
</style>

</head>

<body>

<?php
$images = glob('andy-random/*.png');
$image = $images[array_rand($images)];
?>

<img src="<?php echo $image; ?>" alt="IP Herring">
<center>
        <h2><?php echo $_SERVER['REMOTE_ADDR']; ?></h2>
    </center>
</body>
</html>
