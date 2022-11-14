export default class HtmlService {

    constructor(schoolService) {
        this.schoolsService = schoolService;
        this.bindFormEvent();
        this.listreports();
    }

    bindFormEvent() {
        const form = document.querySelector('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            this.addReport(form.nameItem.value, form.themeItem.value, form.scoreItem.value);
            form.reset();
        })
    }

    async addReport(name, theme, score) {
        const report = { name, theme, score};
        const reportId = await this.schoolsService.save(report);
        console.log(reportId);
        report.id = reportId;
        this.addToHtmlList(report);
    }

    async listreports() {
        const reports = await this.schoolsService.getAll();
        reports.forEach(report => this.addToHtmlList(report));
    }

    async saveReport(reportId) {
        const report = await this.schoolsService.getById(reportId);
        this.schoolsService.save(report);
    }


    async deleteReport(li) {
        const reportId = +li.getAttribute('data-item-id');
        await this.schoolsService.delete(reportId);
        li.remove();        
    }

    addToHtmlList(report) {
        const ul = document.querySelector('ul');
        const liElement = document.createElement('li');
        const spanElement = document.createElement('span');
        const btnElement = document.createElement('button');

        liElement.setAttribute('data-item-id', report.id);

        spanElement.textContent = "Nome: " + report.name + "    -  Matéria: " + report.theme + "    -   Pontuação: " + report.score;

        btnElement.textContent = 'X';
        btnElement.addEventListener('click', event => {
            event.stopPropagation();
            this.deleteReport(liElement);
        })

        liElement.appendChild(spanElement);
        liElement.appendChild(btnElement);
        ul.appendChild(liElement);

    }

}