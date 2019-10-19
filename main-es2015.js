(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"nav-container mt-3\">\n    <nav class=\"nav nav-pills nav-justified\">\n      <a class=\"nav-item nav-link\" [ngClass]=\"{'active': currentStep === 0}\">Upload do arquivo</a>\n      <a class=\"nav-item nav-link\" [ngClass]=\"{'active': currentStep === 1}\">Resultados</a>\n      <a class=\"nav-item nav-link\" [ngClass]=\"{'active': currentStep === 2}\">Entregas</a>\n    </nav>\n  </div>\n  <div class=\"content mt-5\">\n    <div [hidden]=\"currentStep !== 0\">\n      <h1>Upload do arquivo de configuração</h1>\n      <div class=\"input-group mt-3\">\n        <div class=\"custom-file\">\n          <input type=\"file\" class=\"custom-file-input\" id=\"inputGroupFile04\" (change)=\"readFile($event)\">\n          <label class=\"custom-file-label\" for=\"inputGroupFile04\">{{ file && file.name || 'Nenhum arquivo selecionado' }}</label>\n        </div>\n      </div>\n      <div class=\"jumbotron mt-3\" *ngIf=\"file\">\n        <h2>Está tudo correto?</h2>\n        <hr class=\"my-4\">\n        <pre>{{ file.content }}</pre>\n        <div class=\"float-right\">\n          <button type=\"button\" class=\"btn btn-danger\" (click)=\"refreshPage()\">Deu zica, voltar.</button>\n          <button type=\"button\" class=\"btn btn-success ml-2\" (click)=\"nextStep()\">Tudo certo, prosseguir!</button>\n        </div>\n      </div>\n    </div>\n    <div [hidden]=\"currentStep !== 1\">\n      <h1 *ngIf=\"file\">O arquivo {{ file.name }} gerou os seguintes resultados:</h1>\n      <h3 *ngIf=\"nodeData.nodes\" class=\"mt-4\">{{ nodeData.nodes.length }} destinos</h3>\n      <div *ngIf=\"nodeData.nodes && nodeData.nodes.length\" class=\"row mt-3\">\n        <div *ngFor=\"let node of nodeData.nodes\" class=\"col-md-3\">\n          <div class=\"card\">\n            <div class=\"card-body\">\n              <h5 class=\"card-title\">Destino: {{ node.nodeName }}</h5>\n              <h6 class=\"card-subtitle mb-2 text-muted\">Conectado a {{ node.connectToNode.length }} destinos.</h6>\n              <code>\n                {{ JSON.stringify(node) }}\n              </code>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"nodeData.deliveryData\" class=\"mt-3\">\n        <hr>\n        <h3>{{ nodeData.deliveryData.destinations.length }} entregas</h3>\n        <div *ngIf=\"nodeData.deliveryData.destinations.length\" class=\"row mt-3\">\n          <div *ngFor=\"let deliver of nodeData.deliveryData.destinations\" class=\"col-md-3\">\n            <div class=\"card\">\n              <div class=\"card-body\">\n                <h5 class=\"card-title\">Entrega ao destino: {{ deliver.destinationNode }}</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">Iniciando do tempo : {{ deliver.time }} com bônus de: {{ deliver.bonus }}R$</h6>\n                <code>\n                  {{ JSON.stringify(deliver) }}\n                </code>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-3\">\n            <div class=\"card\">\n              <div class=\"card-body text-center\">\n                <h5 class=\"card-title\">Cálculo das entregas</h5>\n                <button type=\"button\" class=\"btn btn-success\" (click)=\"calculateDeliveries()\">Calcular</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"nodeData\" class=\"mt-3 mb-3\">\n        <hr>\n        <h1 class=\"mb-3\">Objeto completo</h1>\n        <code>\n          {{ JSON.stringify(nodeData, null, 2)}}\n        </code>\n      </div>\n    </div>\n    <div [hidden]=\"currentStep !== 2\">\n      <h1 *ngIf=\"file\">Entregas a serem efetuadas</h1>\n      <div *ngIf=\"nodeData.deliveryData\" class=\"mt-3\">\n        <h3>{{ nodeData.deliveryData.destinations.length }} entregas</h3>\n        <div *ngIf=\"nodeData.deliveryData.destinations.length\" class=\"row mt-3\">\n          <div *ngFor=\"let deliver of nodeData.deliveryData.destinations\" class=\"col-md-3\">\n            <div class=\"card\">\n              <div class=\"card-body\">\n                <h5 class=\"card-title\">Entrega ao destino: {{ deliver.destinationNode }}</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">Tempo de entrega até o destino: {{ deliver.timeToDeliver }}.</h6>\n                <h6 class=\"card-subtitle mb-2 text-muted\">O bônus foi: {{ deliver.bonus }}R$.</h6>\n                <h6 class=\"card-subtitle mb-2 text-muted\">O tempo total da entrega(ida + volta) foi: {{ deliver.totalTimeToDeliver }}.</h6>\n                <code>\n                  {{ JSON.stringify(deliver) }}\n                </code>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-3\">\n            <div class=\"card\">\n              <div class=\"card-body text-center\">\n                <h5 class=\"card-title\">Deseja iniciar novamente o algoritmo?</h5>\n                <button type=\"button\" class=\"btn btn-success\" (click)=\"refreshPage()\">Recomeçar</button>\n              </div>\n            </div>\n          </div>\n          <div class=\"w-100 mt-3 text-center\">\n            <h2>Selo de aferição do algoritmo</h2>\n            <img src=\"https://blogfuxicodosertao.com.br/wp-content/uploads/2018/04/unnamed.gif\" class=\"pb-2\">\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _models_node_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/node.model */ "./src/app/models/node.model.ts");



let AppComponent = class AppComponent {
    constructor() {
        this.title = 'Analise de Algoritmos';
        this.currentStep = 0;
        this.destinations = [];
        this.JSON = JSON;
    }
    ngOnInit() {
        this.nodeData = new _models_node_model__WEBPACK_IMPORTED_MODULE_2__["NodeModel"]();
    }
    readFile(fileList) {
        this.file = fileList.target.files[0];
        if (this.file) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                this.file.content = fileReader.result;
            };
            fileReader.readAsText(this.file);
        }
    }
    nextStep() {
        if (this.currentStep === 0) {
            this.createNodes();
        }
        this.currentStep++;
    }
    createNodes() {
        let fileContent = this.file.content;
        let counter = 0;
        fileContent = fileContent.replace(/‘/g, '\'');
        fileContent = fileContent.replace(/’/g, '\'');
        fileContent = fileContent.split('\n');
        fileContent.forEach((data, index) => {
            if (data.trim().length === 1) {
                data = data.trim();
                if (index === 0) {
                    this.nodeData.nodeLength = Number(data);
                }
                else {
                    if (!this.nodeData.deliveryData) {
                        this.nodeData.deliveryData = {};
                        this.setNodesConnections();
                    }
                    this.nodeData.deliveryData.deliveriesLength = Number(data);
                }
            }
            else if (data.length > 1 && data.includes('\'')) {
                const nodes = data.split(',');
                nodes.forEach(node => {
                    if (!this.nodeData.deliveryData) {
                        if (!this.nodeData.nodes) {
                            this.nodeData.nodes = [];
                        }
                        this.nodeData.nodes.push({
                            nodeName: node.replace(/\'/gi, '')
                        });
                    }
                });
            }
            else if (data.length > 1 && data.includes(',') && !this.nodeData.deliveryData) {
                this.destinations[counter] = [];
                data.split(',').forEach(item => {
                    this.destinations[counter].push(item);
                });
                counter++;
            }
            else if (data.length > 1 && data.includes(',') && this.nodeData.deliveryData) {
                const deliver = data.split(',');
                if (!this.nodeData.deliveryData.destinations) {
                    this.nodeData.deliveryData.destinations = [];
                }
                this.nodeData.deliveryData.destinations.push({
                    time: deliver[0],
                    destinationNode: deliver[1],
                    bonus: deliver[2]
                });
            }
        });
    }
    setNodesConnections() {
        for (let d1 = 0; d1 < this.destinations.length; d1++) {
            for (let d2 = 0; d2 < this.destinations.length; d2++) {
                if (Number(this.destinations[d1][d2]) !== 0) {
                    if (!this.nodeData.nodes[d1].connectToNode) {
                        this.nodeData.nodes[d1].connectToNode = [];
                    }
                    this.nodeData.nodes[d1].connectToNode.push({
                        node: this.nodeData.nodes[d2].nodeName,
                        time: Number(this.destinations[d1][d2])
                    });
                }
            }
        }
    }
    calculateDeliveries() {
        this.nextStep();
        for (let i = 0; i < this.nodeData.deliveryData.destinations.length; i++) {
            const destiny = this.nodeData.deliveryData.destinations[i].destinationNode;
            for (let y = 0; y < this.nodeData.nodes.length; y++) {
                if (this.nodeData.nodes[y].nodeName === destiny) {
                    // cheguei
                    break;
                }
                else {
                    if (!this.nodeData.deliveryData.destinations[i].totalTimeToDeliver) {
                        this.nodeData.deliveryData.destinations[i].timeToDeliver = 0;
                        this.nodeData.deliveryData.destinations[i].totalTimeToDeliver = 0;
                    }
                    if (this.nodeData.nodes[y + 1]) {
                        this.nodeData.nodes[y].connectToNode.forEach(node => {
                            if (this.nodeData.nodes[y + 1].nodeName === node.node) {
                                // x2 já contabiliza a volta
                                this.nodeData.deliveryData.destinations[i].timeToDeliver += node.time;
                                this.nodeData.deliveryData.destinations[i].totalTimeToDeliver += node.time * 2;
                            }
                        });
                    }
                }
            }
        }
    }
    refreshPage() {
        window.location.reload();
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");




let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/models/node.model.ts":
/*!**************************************!*\
  !*** ./src/app/models/node.model.ts ***!
  \**************************************/
/*! exports provided: NodeModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeModel", function() { return NodeModel; });
class NodeModel {
}


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\rodri\Desktop\AnaliseSistemas\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map