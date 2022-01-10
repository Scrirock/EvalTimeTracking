import {CreateGroup} from "./CreateGroup";

let timeInterval: NodeJS.Timer;

export class Utils {

    static createCreate(element: string, className: string, appendTo: HTMLElement): HTMLElement {
        let htmlElement = document.createElement(element);
        htmlElement.className = className;
        appendTo.append(htmlElement);

        return htmlElement;
    }

    static saveProject(title: string, task: any) {
        localStorage.setItem(title, JSON.stringify(task));
    }

    static searchProject() {
        if (localStorage !== null && localStorage.length > 0) {
            for (let i:number = 0; i < localStorage.length; i++) {
                let title: string = <string>localStorage.key(i);
                let taskArray: string[] = [];
                for (let ii: number = 0; ii < JSON.parse(localStorage[title]).length; ii++) {
                    let json = JSON.parse(localStorage[title])[ii];
                    let task: string = json.name;
                    taskArray.push(task);
                }
                CreateGroup.addProject(title, taskArray);
            }
        }
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
        if (localStorage !== null) {
            let title: string = <string>element.parentElement?.parentElement?.dataset.project;
            let json = JSON.parse(localStorage[title]);

            for (let o:number = 0; o < json.length; o++) {
                if (json[o].name === taskName) {
                    timeInterval = setInterval(()=>{
                        json[o].time += 1;
                        localStorage[title] = JSON.stringify(json);
                    }, 1000);
                }
            }
        }
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
        Utils.searchProject();
    }

    static editTime(element: HTMLElement, oldTime: string) {
        let title: string = <string>element.dataset.project;
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
                    let json = JSON.parse(localStorage[title]);
                    for (let i: number = 0; i < json.length; i++) {
                        if (json[i].time === oldTime) {
                            json[i].time = parseInt(input.value);
                        }
                    }
                    localStorage[title] = JSON.stringify(json);

                    let text2: HTMLElement = Utils.createCreate("span", "littleParagraph timeSave", element.parentElement);
                    text2.innerHTML = Utils.formatDuration(parseInt(input.value));

                    input.remove();
                    validNewTime.remove();
                }
            });
        }
    }
}