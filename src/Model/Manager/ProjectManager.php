<?php

namespace Scri\EvalTimeTracking\Model\Manager;

use RedBeanPHP\R;
use Scri\EvalTimeTracking\Model\Entity\Project;

class ProjectManager {

    public function addProject(Project $projectObject){
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        $project = R::dispense('project');
        $project->name = $projectObject->getName();
        R::store($project);

    }

    public function getProjects(): array {
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        return R::findAll('project');
    }

    public function getProjectId($name): string{

        return R::findOne('project', 'name = ?', [$name])['id'];

    }

    public function deleteProject($delProject){
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        $id = $this->getProjectId($delProject);

        R::trash('project', $id);
    }
}