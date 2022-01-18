import {Utils} from "./Utils";
import {IconClick} from "./IconClick";
import {CreateInput} from "./CreateInput";

export class ChangePage {

    static detailedProject(title: string) {

        let oldContainer: HTMLElement = <HTMLElement>document.querySelector(".groupContainer");
        if (oldContainer !== null) oldContainer.remove();

        let newContainer = Utils.createCreate("div", "projectContainer", document.body);

        let divHour: HTMLElement = Utils.createCreate("div", "hour", newContainer);
        divHour.innerHTML = "Heures total: ";
        let spanHour: HTMLElement = Utils.createCreate("span", "totalHour", divHour);

        let divBack: HTMLElement = Utils.createCreate("div", "back", newContainer);
        divBack.innerHTML = "Acceuil";

        divBack.addEventListener("click", ()=>{
            Utils.homePage()
        })

        let totalHour: number = 0;
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            const data: any[] = JSON.parse(xhr.responseText);
            data.forEach(data => {
                if (data.projectName === title) {
                    totalHour += parseInt(data.time);
                }
                spanHour.innerHTML = Utils.formatDuration(totalHour);
            });
        };

        xhr.open('GET', '../../api/taskAPI.php?get=task');
        xhr.send();

        let projectTitle: HTMLElement = Utils.createCreate("p", "projectTitle", newContainer);
        projectTitle.innerHTML = title;

        let taskContainer: HTMLElement = Utils.createCreate("div", "taskContainer", newContainer);

        let xhrTask = new XMLHttpRequest();
        xhrTask.onload = function() {
            const taskData: any[] = JSON.parse(xhrTask.responseText);

            taskData.forEach(taskData => {
                if (taskData.projectName === title) {
                    let taskLine: HTMLElement = Utils.createCreate("div", "taskLine", taskContainer);
                    let taskName: HTMLElement = Utils.createCreate("p", "taskName", taskLine);
                    taskName.innerHTML = taskData.taskName;

                    let div1: HTMLElement = Utils.createCreate("div", "none", taskLine);
                    Utils.createCreate("i", "far fa-calendar-alt", div1);
                    let text: HTMLElement = Utils.createCreate("span", "littleParagraph timeSince", div1);
                    text.innerHTML = taskData.lastUpdate;

                    let div2: HTMLElement = Utils.createCreate("div", "none", taskLine);
                    let stopwatch: HTMLElement = Utils.createCreate("i", "fas fa-stopwatch", div2);
                    stopwatch.dataset.task = taskData.taskName;
                    stopwatch.dataset.project = title;
                    stopwatch.dataset.taskId = taskData.taskId;
                    let text2: HTMLElement = Utils.createCreate("span", "littleParagraph timeSave", div2);
                    text2.innerHTML = Utils.formatDuration(taskData.time);

                    stopwatch.addEventListener("click", ()=>{
                        Utils.editTime(stopwatch, taskData.time);
                    });

                    let div3: HTMLElement = Utils.createCreate("div", "none", taskLine);
                    let edit: HTMLElement = Utils.createCreate("i", "far fa-edit", div3);
                    IconClick.editTaskIcon(edit);
                    let trash: HTMLElement = Utils.createCreate("i", "far fa-trash-alt", div3);
                    IconClick.deleteTaskIcon(trash, taskData.taskId, title);
                }
            });
        };

        xhrTask.open('GET', '../../api/taskAPI.php?get=task');
        xhrTask.send();
    }

}