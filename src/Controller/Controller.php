<?php

namespace Scri\EvalTimeTracking\Controller;

use Scri\EvalTimeTracking\Controller\Traits\RenderViewTrait;
use Scri\EvalTimeTracking\Model\Entity\User;
use Scri\EvalTimeTracking\Model\Manager\UserManager;

class Controller{

    use RenderViewTrait;

    /**
     * Show the home page
     */
    public function homePage() {
        $this->render('home', 'Time tracking');
    }

    public function detailedPage($id) {
        $this->render('home', 'Time tracking');
    }

    public function connexionPage($fields) {
        $this->render('connexion', 'Se connecter');

        if (isset($fields['username'], $fields['password'])) {
            if ((new UserManager())->checkUser($fields['username'], $fields['password'])) {
                $_SESSION['username'] = $fields['username'];
                header("Location: /");
            }
            else {
                $_SESSION["error"] = "Mot de passe ou nom incorrect";
            }
        }
    }

    public function inscriptionPage($fields) {
        $this->render('inscription', 'S\'inscrire');

        if (isset($fields['username'], $fields['password'])) {
            $user = new User($fields['username'], $fields['password']);
            (new UserManager())->inscription($user);
            header("Location: /");
        }
    }

}