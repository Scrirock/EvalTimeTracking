<?php

use Scri\EvalTimeTracking\Model\Entity\Task;
use Scri\EvalTimeTracking\Model\Entity\Project;
use Scri\EvalTimeTracking\Model\Manager\ProjectManager;
use Scri\EvalTimeTracking\Model\Manager\TaskManager;

require_once "../../vendor/autoload.php";

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$taskManager = new TaskManager();
$projectManager = new ProjectManager();

switch($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        if (isset($_GET['get'])) {
            switch ($_GET['get']) {
                case "project":
                    echo getProjects($projectManager);
                    break;
                case "task":
                    echo getTask($taskManager);
                    break;
            }
        }

        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'));

        if (isset($data->taskArray)) {
            $project = $projectManager->getProjects();
            foreach ($data->taskArray as $taskName) {
                $taskManager->addTask(new Task(intval($data->projectName), $taskName, $data->time));
            }
        }
        else if (isset($data->name)) {
            $projectManager->addProject(new Project($data->name));
            $projectId = $projectManager->getProjectId($data->name);

            if (count($data->task) > 0) {
                foreach ($data->task as $taskName) {
                    $taskManager->addTask(new Task(intval($projectId), $taskName, $data->time));
                }
            }
        }
        else if (isset($data->delProject)) {
            $projectManager->deleteProject($data->delProject);
        }
        else if (isset($data->delTask)) {
            $taskManager->deleteTask(intval($data->delTask));
        }
        else if (isset($data->timeChangeName)) {
            $taskManager->addOneSec($data->timeChangeName);
        }
        else if (isset($data->editTime)) {
            $projectId = $projectManager->getProjectId($data->projectName);
            $taskManager->editTimeTask(new Task(intval($projectId), $data->editTime, $data->newTime, null, $data->taskId));
        }
        else if (isset($data->oldTask)) {
            $taskManager->editTask($data->oldTask, $data->newTask);
        }


        break;
}

function getTask(TaskManager $manager): string {
    $response = [];

    $data = $manager->getTasks();
    foreach($data as $task) {
        $response[] = [
            'projectName' => $task['projectName'],
            'fk_project' => $task['fk_project'],
            'taskName' => $task['taskName'],
            'time' => $task['time'],
            'lastUpdate' => $task['lastupdate'],
            'taskId' => $task['taskId']
        ];
    }

    return json_encode($response);
}

function getProjects(ProjectManager $manager): string {
    $response = [];

    $data = $manager->getProjects();
    foreach($data as $project) {
        $response[] = [
            'projectName' => $project['name'],
            'projectId' => $project['id'],
        ];
    }

    return json_encode($response);
}

exit;