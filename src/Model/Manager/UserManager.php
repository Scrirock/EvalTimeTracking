<?php

namespace Scri\EvalTimeTracking\Model\Manager;

use RedBeanPHP\R;
use Scri\EvalTimeTracking\Model\Entity\User;

class UserManager {

    public function checkUser($name, $password): bool{
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        $user = R::findOne('user', 'username = ?', [$name]);

        if ($user) {
            if(password_verify($password, $user["password"])) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    public function getUserByName($name) {
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');
        return R::findOne('user', 'username = ?', [$name])['id'];
    }

    public function inscription(User $user){
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        $taskRequest = R::dispense('user');
        $taskRequest->username = $user->getUsername();
        $taskRequest->password = password_hash($user->getPassword(), PASSWORD_BCRYPT);
        R::store($taskRequest);

        $_SESSION['username'] = $user->getUsername();
    }
}