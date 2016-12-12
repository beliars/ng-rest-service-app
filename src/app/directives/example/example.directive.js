import ChartHtml from './chart-modal.html';

export class ChartModalDirective {

    constructor($compile) {
        this.restrict = 'EA';
        this.$compile = $compile;
        this.scope = {
            usersGender: '<', 
            onClose: '&'
        };   

        this.controller = ChartModalDirectiveController;
        this.controllerAs = '$ctrl';
        this.bindToController = true;       
    }
    
// Directive link function
    link(scope, elem) {
        const body = angular.element(document.querySelector("body"));
        elem.on('click', (e) => {
            e.preventDefault();
            const del = body.find('chart-modal-directive')[0];
            console.log('!!!!!!del');
            console.log(del);
            if (del) {
                del.remove();
            }
            else {
                const el = this.$compile(ChartHtml)(scope);
                console.log(body.find('h1'));
                body.append(el);
            }
        });
    }
}

class ChartModalDirectiveController {
    constructor($scope) {
        console.log($scope);
        this.test = 'TEST';
        this.colors = ["rgb(82,130,199)","rgb(220,104,80)"];
        this.labels = ['Male', 'Female'];
        this.data = [this.usersGender.male, this.usersGender.female];
        console.log(this.data);
  }
}
