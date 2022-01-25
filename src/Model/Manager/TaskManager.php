<?php

namespace Scri\EvalTimeTracking\Model\Manager;

use RedBeanPHP\OODBBean;
use RedBeanPHP\R;
use Scri\EvalTimeTracking\Model\Entity\Task;

class TaskManager {

    public function getTasks(): array {
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        return R::getAll("SELECT t.id as taskId,
                                      t.fk_project,
                                      t.name as taskName,
                                      t.time,
                                      t.lastupdate,
                                      p.id as projectId,
                                      p.name as projectName
                                    FROM task as t
                                INNER JOIN project as p
                                    ON t.fk_project = p.id");
    }

    public function getOneTask($taskName): ?OODBBean{
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        return R::findOne('task', 'name = ?', [$taskName]);
    }

    public function addTask(Task $task) {
//        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        $taskRequest = R::dispense('task');
        $taskRequest->name = $task->getName();
        $taskRequest->fk_project = $task->getFkProject();
        $taskRequest->time = $task->getTime();
        R::store($taskRequest);
    }

    public function editTask($old, $new) {

        $id = $this->getOneTask($old)['id'];

        $task = R::load("task", $id);
        $task->name = $new;

        R::store($task);
    }

    public function deleteTask($id) {
        R::setup("mysql:host=localhost;dbname=timetracking;charset=utf8", 'root', '');

        R::trash('task', $id);
    }

    public function addOneSec($name) {

        $task = $this->getOneTask($name);

        $time = $task['time'] + 1;
        $id = $task['id'];

        $taskRequest = R::load("task", $id);
        $taskRequest->time = $time;

        R::store($taskRequest);
    }

    public function editTimeTask(Task $task) {

        $id = $task->getId();

        $taskRequest = R::load("task", $id);
        $taskRequest->time = $task->getTime();

        R::store($taskRequest);
    }
}