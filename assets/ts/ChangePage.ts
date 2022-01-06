import {Utils} from "./Utils";
import {IconClick} from "./IconClick";

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
        for (let i: number = 0; i < JSON.parse(localStorage[title]).length; i++) {
            totalHour += JSON.parse(localStorage[title])[i].time;
        }
        spanHour.innerHTML = Utils.formatDuration(totalHour);

        let projectTitle: HTMLElement = Utils.createCreate("p", "projectTitle", newContainer);
        projectTitle.innerHTML = title;

        let taskContainer: HTMLElement = Utils.createCreate("div", "taskContainer", newContainer);

        for (let i:number = 0; i < JSON.parse(localStorage[title]).length; i++) {
            let taskLine: HTMLElement = Utils.createCreate("div", "taskLine", taskContainer);
            let taskName: HTMLElement = Utils.createCreate("p", "taskName", taskLine);
            taskName.innerHTML = JSON.parse(localStorage[title])[i].name;

            let div1: HTMLElement = Utils.createCreate("div", "none", taskLine);
            Utils.createCreate("i", "far fa-calendar-alt", div1);
            let text: HTMLElement = Utils.createCreate("span", "littleParagraph timeSince", div1);
            //TODO enlever l'exemple
            text.innerHTML = "15/15/15";

            let div2: HTMLElement = Utils.createCreate("div", "none", taskLine);
            Utils.createCreate("i", "fas fa-stopwatch", div2);
            let text2: HTMLElement = Utils.createCreate("span", "littleParagraph timeSave", div2);
            text2.innerHTML = Utils.formatDuration(JSON.parse(localStorage[title])[i].time);

            let div3: HTMLElement = Utils.createCreate("div", "none", taskLine);
            let edit: HTMLElement = Utils.createCreate("i", "far fa-edit", div3);
            IconClick.editTaskIcon(edit);
            let trash: HTMLElement = Utils.createCreate("i", "far fa-trash-alt", div3);
            IconClick.deleteTaskIcon(trash);

        }
    }

}