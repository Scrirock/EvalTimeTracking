<?php

if (isset($_SESSION['username'])){
    session_destroy();
    header("Location: /");
}

?>

<div id="connexionContainer">
    <div class="signupSection">
        <form action="" method="POST" class="signupForm" name="signupform">
            <h2>Se connecter</h2>
            <ul class="noBullet">
                <li>
                    <label for="username"></label>
                    <input type="text" class="inputFields" id="username" name="username" placeholder="Nom" required/>
                </li>
                <li>
                    <label for="password"></label>
                    <input type="text" class="inputFields" id="password" name="password" placeholder="Mot de passe" required/>
                </li>
                <li id="center-btn">
                    <input type="submit" id="join-btn" name="join" value="Se connecter">
                </li>
            </ul>
            <?php if (isset($_SESSION['error'])) echo $_SESSION['error'] ?>
        </form>
        <div id="needAccount">
            <p>Vous n'avez pas de compte ?</p>
            <button class="button-51" role="button">
                <a href="/?controller=inscription">Créer un compte</a>
            </button>
            <button class="button-51 bot" role="button">
                <a href="/">Accueil</a>
            </button>
        </div>
    </div>
</div>