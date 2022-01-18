<?php

namespace Scri\EvalTimeTracking\Controller;

use Scri\EvalTimeTracking\Controller\Traits\RenderViewTrait;

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

}