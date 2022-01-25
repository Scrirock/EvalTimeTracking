<?php

namespace Scri\EvalTimeTracking\Model\Manager;

use RedBeanPHP\R;
use Scri\EvalTimeTracking\Model\Entity\Project;

class ProjectManager {

    public function addProject(Project $projectObject){
        $fkUser = (new UserManager())->getUserByName($projectObject->getFkUser());
        $project = R::dispense('project');
        $project->name = $projectObject->getName();
        $project->fk_user = $fkUser;
        R::store($project);
    }

    public function getProjects(): array {
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        return R::getAll("SELECT  p.id as projectId,
                                      p.name,
                                      u.id as userID,
                                      u.username
                                    FROM project as p
                                INNER JOIN user as u 
                                    ON p.fk_user = u.id");
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