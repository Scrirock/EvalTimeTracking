<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./build/css/app.css">
    <script src="https://kit.fontawesome.com/10b102adea.js" crossorigin="anonymous"></script>
    <title><?= $title ?></title>
</head>
<body>

    <nav>
        <button class="button-51" role="button">
            <a href="/?controller=connexion">
                <?php
                    if (isset($_SESSION['username'])) {
                        echo "Se déconnecter";
                    }
                    else {
                        echo "Se connecter";
                    }
                ?>
            </a>
        </button>
    </nav>

    <?= $html ?>

    <script src="./build/js/app.js"></script>
</body>
</html>