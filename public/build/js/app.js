(()=>{"use strict";var e={326:(e,t,a)=>{a.r(t)},525:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ChangePage=void 0;const r=a(22),n=a(829);t.ChangePage=class{static detailedProject(e){let t=document.querySelector(".groupContainer");null!==t&&t.remove();let a=r.Utils.createCreate("div","projectContainer",document.body),i=r.Utils.createCreate("div","hour",a);i.innerHTML="Heures total: ";let l=r.Utils.createCreate("span","totalHour",i),s=r.Utils.createCreate("div","back",a);s.innerHTML="Acceuil",s.addEventListener("click",(()=>{r.Utils.homePage()}));let o=0,c=new XMLHttpRequest;c.onload=function(){JSON.parse(c.responseText).forEach((t=>{t.projectName===e&&(o+=parseInt(t.time)),l.innerHTML=r.Utils.formatDuration(o)}))},c.open("GET","../../api/taskAPI.php?get=task"),c.send(),r.Utils.createCreate("p","projectTitle",a).innerHTML=e;let d=r.Utils.createCreate("div","taskContainer",a),p=new XMLHttpRequest;p.onload=function(){JSON.parse(p.responseText).forEach((t=>{if(t.projectName===e){let a=r.Utils.createCreate("div","taskLine",d);r.Utils.createCreate("p","taskName",a).innerHTML=t.taskName;let i=r.Utils.createCreate("div","none",a);r.Utils.createCreate("i","far fa-calendar-alt",i),r.Utils.createCreate("span","littleParagraph timeSince",i).innerHTML=t.lastUpdate;let l=r.Utils.createCreate("div","none",a),s=r.Utils.createCreate("i","fas fa-stopwatch",l);s.dataset.task=t.taskName,s.dataset.project=e,s.dataset.taskId=t.taskId,r.Utils.createCreate("span","littleParagraph timeSave",l).innerHTML=r.Utils.formatDuration(t.time),s.addEventListener("click",(()=>{r.Utils.editTime(s,t.time)}));let o=r.Utils.createCreate("div","none",a),c=r.Utils.createCreate("i","far fa-edit",o);n.IconClick.editTaskIcon(c);let p=r.Utils.createCreate("i","far fa-trash-alt",o);n.IconClick.deleteTaskIcon(p,t.taskId,e)}}))},p.open("GET","../../api/taskAPI.php?get=task"),p.send()}}},13:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CreateGroup=void 0;const r=a(14),n=a(22),i=a(829);let l;class s{static createGroupContainer(){l=n.Utils.createCreate("div","groupContainer",document.body)}static createAddProject(){let e=n.Utils.createCreate("div","group",l);n.Utils.createCreate("i","far fa-plus-square",e),n.Utils.createCreate("p","addProjectParagraph",e).innerHTML="Ajouter un projet",e.addEventListener("click",r.CreateInput.createProjectInput)}static getProject(){let e=new XMLHttpRequest;e.onload=function(){const t=JSON.parse(e.responseText);let a=[];t.forEach((e=>{let t=e.projectName;if(!a.includes(t)){a.push(t);let s=n.Utils.createCreate("div","group",l),o=n.Utils.createCreate("div","headline",s),c=n.Utils.createCreate("i","far fa-eye",o);c.title="Voir le projet en détail",c.dataset.project=t,i.IconClick.eyeIcon(c),n.Utils.createCreate("p","projectTitle",o).innerHTML=t;let d=n.Utils.createCreate("i","far fa-trash-alt",o);d.title="Supprimer le projet",d.dataset.project=t;let p=n.Utils.createCreate("div","content",s),u=n.Utils.createCreate("div","info",p);i.IconClick.deleteIcon(d);let m=n.Utils.createCreate("div","clockDiv",u);n.Utils.createCreate("i","far fa-clock",m).title="Temps total d'heures sur le projet";let v=n.Utils.createCreate("p","time",m),C=0,f=new XMLHttpRequest;f.onload=function(){JSON.parse(f.responseText).forEach((e=>{e.projectName===t&&(C+=parseInt(e.time)),v.innerHTML=n.Utils.formatDuration(C)}))},f.open("GET","../../api/taskAPI.php?get=task"),f.send(),v.dataset.type="clock";let T=n.Utils.createCreate("div","calendarDiv",u);n.Utils.createCreate("i","far fa-calendar-alt",T).title="Dernière modification";let k=n.Utils.createCreate("p","time",T);k.innerHTML="il y a 0 heures",k.dataset.type="calendar";let U=n.Utils.createCreate("div","taskContainer",p);n.Utils.createCreate("div","fixHeight",U).dataset.project=t;let h=n.Utils.createCreate("div","addTask",U);h.innerHTML="Ajouter une tâche",h.dataset.project=e.projectId,h.addEventListener("click",(()=>{r.CreateInput.createTaskInput(h)}))}})),s.getTask()},e.open("GET","../../api/taskAPI.php?get=project"),e.send()}static getTask(){let e=document.querySelectorAll(".fixHeight"),t=new XMLHttpRequest;t.onload=function(){JSON.parse(t.responseText).forEach((t=>{for(let a=0;a<e.length;a++)if(e[a].dataset.project===t.projectName){let r=n.Utils.createCreate("div","taskLine",e[a]);n.Utils.createCreate("p","task",r).innerHTML=t.taskName;let i=n.Utils.createCreate("i","fas fa-stopwatch",r);i.dataset.task=t.taskName,n.Utils.stopwatchClick(i)}}))},t.open("GET","../../api/taskAPI.php?get=task"),t.send()}}t.CreateGroup=s},14:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CreateInput=void 0;const r=a(22);let n;t.CreateInput=class{static createProjectInput(){let e=document.querySelector(".groupContainer");e&&(e.style.filter="blur(4px)");let t=r.Utils.createCreate("div","addProjectContainer",document.body),a=r.Utils.createCreate("div","littleSquare",t);r.Utils.createCreate("p","formTitle",a).innerHTML="Ajouter un projet";let i=document.createElement("label");i.innerHTML="Nom du projet",i.htmlFor="projectName",a.append(i);let l=document.createElement("input");l.type="text",l.id="projectName",a.append(l),r.Utils.createCreate("p","formTitle",a).innerHTML="Ajouter des tâches";let s=document.createElement("label");s.innerHTML="Nom de la tâche",s.htmlFor="taskName",a.append(s);let o=document.createElement("input");o.type="text",o.id="taskName",a.append(o);let c=r.Utils.createCreate("i","far fa-check-circle",a);c.title="Confirmer",c.addEventListener("click",(()=>{r.Utils.createCreate("p","task",n).innerHTML=o.value,o.value=""})),n=r.Utils.createCreate("div","formAddTask",a);let d=r.Utils.createCreate("div","buttonContainer",a),p=r.Utils.createCreate("div","confirmAdd",d);p.innerHTML="Ajouter";let u=r.Utils.createCreate("div","cancel",d);u.innerHTML="Annuler",u.addEventListener("click",(()=>{e.style.filter="blur(0)",t.remove()})),p.addEventListener("click",(()=>{if(l.value.length>0){let a=n.children,i=[];for(let e=0;e<a.length;e++)i.push(a[e].innerHTML);let s=new XMLHttpRequest;const o={name:l.value,task:i,time:0};s.open("POST","../../api/taskAPI.php"),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(o)),e.style.filter="blur(0)",t.remove(),r.Utils.reload()}else{r.Utils.createCreate("p","errorMessage",a).innerHTML="N'oublie pas de nommer votre projet"}}))}static createTaskInput(e){let t=document.querySelector(".groupContainer");t&&(t.style.filter="blur(4px)");let a=r.Utils.createCreate("div","addProjectContainer",document.body),i=r.Utils.createCreate("div","littleSquare",a);r.Utils.createCreate("p","formTitle",i).innerHTML="Ajouter des tâches";let l=document.createElement("label");l.innerHTML="Nom de la tâche",l.htmlFor="taskName",i.append(l);let s=document.createElement("input");s.type="text",s.id="taskName",i.append(s);let o=r.Utils.createCreate("i","far fa-check-circle",i);o.title="Confirmer",o.addEventListener("click",(()=>{r.Utils.createCreate("p","newTask",n).innerHTML=s.value,s.value=""})),n=r.Utils.createCreate("div","formAddTask",i);let c=r.Utils.createCreate("div","buttonContainer",i),d=r.Utils.createCreate("div","confirmAdd",c);d.innerHTML="Ajouter";let p=r.Utils.createCreate("div","cancel",c);p.innerHTML="Annuler",p.addEventListener("click",(()=>{t&&(t.style.filter="blur(0)"),a.remove()})),d.addEventListener("click",(()=>{if(n.children.length>0){let i=[],l=n.children;for(let e=0;e<l.length;e++)i.push(l[e].innerHTML);let s=new XMLHttpRequest;const o={taskArray:i,projectName:e.dataset.project,time:0};s.open("POST","../../api/taskAPI.php"),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(o)),t&&(t.style.filter="blur(0)"),a.remove(),r.Utils.reload()}else{r.Utils.createCreate("p","errorMessage",i).innerHTML="Il n'y a aucune tâche à ajouter"}}))}}},829:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.IconClick=void 0;const r=a(525),n=a(22);t.IconClick=class{static deleteTaskIcon(e,t,a){e.addEventListener("click",(()=>{let r=e.parentElement;if(r&&(r=r.parentElement),r){let e=new XMLHttpRequest;const r={delTask:t};e.open("POST","../../api/taskAPI.php"),e.setRequestHeader("Content-Type","application/json"),e.send(JSON.stringify(r)),n.Utils.reloadDetailed(a)}}))}static eyeIcon(e){e.addEventListener("click",(()=>{var t,a;r.ChangePage.detailedProject(null===(a=null===(t=e.nextElementSibling)||void 0===t?void 0:t.nextElementSibling)||void 0===a?void 0:a.innerHTML)}))}static deleteIcon(e){e.addEventListener("click",(()=>{let t=new XMLHttpRequest;const a={delProject:e.dataset.project};t.open("POST","../../api/taskAPI.php"),t.setRequestHeader("Content-Type","application/json"),t.send(JSON.stringify(a)),n.Utils.reload()}))}static editTaskIcon(e){e.addEventListener("click",(()=>{var t,a,r,n;let i=null===(r=null===(a=null===(t=e.parentElement)||void 0===t?void 0:t.previousElementSibling)||void 0===a?void 0:a.previousElementSibling)||void 0===r?void 0:r.previousElementSibling,l=document.createElement("input");l.className="editInput",l.value=i.innerHTML,null===(n=i.parentElement)||void 0===n||n.prepend(l),i.style.display="none",l.addEventListener("keyup",(e=>{if("Enter"===e.key){let e=i.innerHTML;i.innerHTML=l.value,i.style.display="initial",l.remove();let t=new XMLHttpRequest;const a={oldTask:e,newTask:l.value};t.open("POST","../../api/taskAPI.php"),t.setRequestHeader("Content-Type","application/json"),t.send(JSON.stringify(a))}}))}))}}},22:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Utils=void 0;const r=a(13),n=a(525);let i;class l{static createCreate(e,t,a){let r=document.createElement(e);return r.className=t,a.append(r),r}static stopwatchClick(e){let t=!1;e.addEventListener("click",(()=>{clearInterval(i);let a=e.dataset.task,r=document.querySelectorAll(".fa-stopwatch");for(let e=0;e<r.length;e++)r[e].style.color="#49cd6d";t?(this.stopTime(e,a),t=!1):(this.addTime(e,a),t=!0)}))}static addTime(e,t){e.style.color="#e24e58",i=setInterval((()=>{let e=new XMLHttpRequest;const a={timeChangeName:t};e.open("POST","../../api/taskAPI.php"),e.setRequestHeader("Content-Type","application/json"),e.send(JSON.stringify(a))}),1e3)}static stopTime(e,t){e.style.color="#49cd6d",clearInterval(i)}static formatDuration(e){const t={h:Math.floor(e/3600)%24,m:Math.floor(e/60)%60,s:e%60};return Object.entries(t).filter((e=>0!==e[1])).map((([e,t])=>`${t} ${e}`)).join(" ")}static getHoursDiffBetweenDates(e,t){return Math.floor((t-e)/36e5)}static homePage(){let e=document.querySelector(".projectContainer");null!==e&&e.remove(),r.CreateGroup.createGroupContainer(),r.CreateGroup.createAddProject(),this.reload()}static editTime(e,t){let a=e.dataset.task,r=e.dataset.taskId,n=e.dataset.project;if(null!==e.nextElementSibling&&e.nextElementSibling.remove(),null!==e.parentElement){let i=document.createElement("input");i.value=t,i.className="newTime",e.parentElement.append(i);let s=document.createElement("button");s.innerHTML="✔",s.className="validNewTime",e.parentElement.append(s),s.addEventListener("click",(()=>{if(null!==e.parentElement){let t=new XMLHttpRequest;const o={editTime:a,projectName:n,newTime:i.value,taskId:r};t.open("POST","../../api/taskAPI.php"),t.setRequestHeader("Content-Type","application/json"),t.send(JSON.stringify(o)),l.createCreate("span","littleParagraph timeSave",e.parentElement).innerHTML=l.formatDuration(parseInt(i.value)),i.remove(),s.remove()}}))}}static reload(){let e=document.querySelectorAll(".group:not(.group:first-child)");for(let t=0;t<e.length;t++)e[t].remove();r.CreateGroup.getProject()}static reloadDetailed(e){let t=document.querySelector(".projectContainer");null!==t&&t.remove(),n.ChangePage.detailedProject(e)}}t.Utils=l}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,a),i.exports}a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};(()=>{a(326);a(22).Utils.homePage()})()})();