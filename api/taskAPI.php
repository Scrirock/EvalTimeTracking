<?php

use Scri\EvalTimeTracking\Model\Entity\Task;
use Scri\EvalTimeTracking\Model\Manager\TaskManager;

require_once $_SERVER['DOCUMENT_ROOT'] . '/src/Model/Entity/Task.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/src/Model/Manager/TaskManager.php';

header('Content-Type: application/json');

$manager = new TaskManager();

switch($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        echo getTask($manager);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'));

        break;
}

/**
 * Return the message list.
 * @param TaskManager $manager
 * @return string
 */
function getTask(TaskManager $manager): string {
    $response = [];

    $data = $manager->getTasks();
    foreach($data as $task) {
        /* @var Task $message */
        $response[] = [
            'projectName' => $task['projectName'],
            'taskName' => $task['taskName'],
            'time' => $task['time'],
            'lastUpdate' => $task['lastupdate'],
        ];
    }

    return json_encode($response);
}

exit;