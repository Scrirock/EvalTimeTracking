import {CreateGroup} from "./CreateGroup";
import {ChangePage} from "./ChangePage";

let timeInterval: NodeJS.Timer;

export class Utils {

    static createCreate(element: string, className: string, appendTo: HTMLElement): HTMLElement {
        let htmlElement = document.createElement(element);
        htmlElement.className = className;
        appendTo.append(htmlElement);

        return htmlElement;
    }

    static stopwatchClick(element: HTMLElement) {
        let flag: boolean = false;
        element.addEventListener("click", ()=>{
            clearInterval(timeInterval);
            let taskName: string = <string>element.dataset.task;
            let otherStopwatch: NodeListOf<HTMLElement> = document.querySelectorAll(".fa-stopwatch");
            for (let i:number = 0; i < otherStopwatch.length; i++) {
                otherStopwatch[i].style.color = "#49cd6d";
            }
            if (flag) {
                this.stopTime(element, taskName);
                flag = false;
            }
            else {
                this.addTime(element, taskName);
                flag = true;
            }
        });
    }

    static addTime(element: HTMLElement, taskName: string) {
        element.style.color = "#e24e58";
        timeInterval = setInterval(()=>{
            let xhr = new XMLHttpRequest();

            const projectData = {
                'timeChangeName': taskName,
            };

            xhr.open('POST', '../../api/taskAPI.php');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(projectData));
        }, 1000)
    }

    static stopTime(element: HTMLElement, taskName: string) {
        element.style.color = "#49cd6d";
        clearInterval(timeInterval);
    }

    static formatDuration(s: number){
        const time = {
            h: Math.floor(s / 3600) % 24,
            m: Math.floor(s / 60) % 60,
            s: s % 60,
        };
        return Object.entries(time)
            .filter(val => val[1] !== 0)
            .map(([key, val]) => `${val} ${key}`)
            .join(' ');
    };

    static getHoursDiffBetweenDates(dateInitial: any, dateFinal: any) {
        return Math.floor((dateFinal - dateInitial) / (1000 * 3600));
    }

    static homePage() {
        let oldContainer: HTMLElement = <HTMLElement>document.querySelector(".projectContainer");
        if (oldContainer !== null) oldContainer.remove();

        CreateGroup.createGroupContainer();
        CreateGroup.createAddProject();
        this.reload();
    }

    static editTime(element: HTMLElement, oldTime: string) {
        let taskName: string = <string>element.dataset.task;
        let taskId: string = <string>element.dataset.taskId
        let projectName: string = <string>element.dataset.project;
        if (element.nextElementSibling !== null) element.nextElementSibling.remove();
        if (element.parentElement !== null) {
            let input: HTMLInputElement = document.createElement("input");
            input.value = oldTime;
            input.className = "newTime";
            element.parentElement.append(input);

            let validNewTime: HTMLButtonElement = document.createElement("button");
            validNewTime.innerHTML = "✔";
            validNewTime.className = "validNewTime";
            element.parentElement.append(validNewTime);

            validNewTime.addEventListener("click", ()=>{
                if (element.parentElement !== null) {
                    let xhr = new XMLHttpRequest();

                    const projectData = {
                        'editTime': taskName,
                        'projectName': projectName,
                        'newTime': input.value,
                        'taskId': taskId
                    };

                    xhr.open('POST', '../../api/taskAPI.php');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(projectData));

                    let text2: HTMLElement = Utils.createCreate("span", "littleParagraph timeSave", element.parentElement);
                    text2.innerHTML = Utils.formatDuration(parseInt(input.value));

                    input.remove();
                    validNewTime.remove();
                }
            });
        }
    }

    static reload() {
        let group = document.querySelectorAll(".group:not(.group:first-child)");
        for (let i: number = 0; i < group.length; i++) {
            group[i].remove();
        }
        CreateGroup.getProject();
    }

    static reloadDetailed(title: string) {
        let oldContainer: HTMLElement = <HTMLElement>document.querySelector(".projectContainer");
        if (oldContainer !== null) oldContainer.remove();
        ChangePage.detailedProject(title);
    }
}