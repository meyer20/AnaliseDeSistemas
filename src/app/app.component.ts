import { Component, OnInit } from '@angular/core';
import { NodeModel } from './models/node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Analise de Algoritmos';
  file;
  currentStep = 0;
  nodeData;
  destinations = [];
  JSON = JSON;

  ngOnInit() {
    this.nodeData = new NodeModel();
  }

  readFile(fileList) {
    this.file = fileList.target.files[0];
    if (this.file) {
      const fileReader: FileReader = new FileReader();
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
    fileContent = fileContent.replace(/\uFFFD/g, '\'');
    fileContent = fileContent.split('\n');
    fileContent.forEach((data, index) => {
      if (data.trim().length === 1) {
        data = data.trim();
        if (index === 0) {
          this.nodeData.nodeLength = Number(data);
        } else {
          if (!this.nodeData.deliveryData) {
            this.nodeData.deliveryData = {};
            this.setNodesConnections();
          }
          this.nodeData.deliveryData.deliveriesLength = Number(data);
        }
      } else if (data.length > 1 && data.includes('\'')) {
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
      } else if (data.length > 1 && data.includes(',') && !this.nodeData.deliveryData) {
        this.destinations[counter] = [];
        data.split(',').forEach(item => {
          this.destinations[counter].push(item);
        });
        counter++;
      } else if (data.length > 1 && data.includes(',') && this.nodeData.deliveryData) {
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
          if (!this.nodeData.nodes[d1]) {
            return;
          }
          if (!this.nodeData.nodes[d1].connectToNode) {
            this.nodeData.nodes[d1].connectToNode = [];
          }
          if (this.nodeData.nodes[d2]) {
            this.nodeData.nodes[d1].connectToNode.push({
              node: this.nodeData.nodes[d2].nodeName,
              time: Number(this.destinations[d1][d2])
            });
          }
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
        } else {
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

  // calculate() {
  //   this.nextStep();
  //   let ways = [];
  //   for (let i = 0; i < this.nodeData.deliveryData.destinations.length; i++) {
  //     const destiny = this.nodeData.deliveryData.destinations[i].destinationNode;
  //
  //     for (let y = 0; y < this.nodeData.nodes.length; y++) {
  //       if (this.nodeData.nodes[y].nodeName === destiny) {
  //         // cheguei
  //         break;
  //       } else {
  //         if (this.nodeData.connectToNode.length) {
  //           for (let x = 0; x < this.nodeData.connectToNode.length; x++) {
  //             // if (!ways.length) {
  //             // }
  //             if (this.nodeData.connectToNode[y].nodeName === destiny) {
  //               if (!ways[i][destiny]) {
  //                 ways.push({
  //                   destiny: {
  //                     path: this.nodeData.connectToNode[y].nodeName,
  //                     cost: this.nodeData.connectToNode[y].time,
  //                   }
  //                 });
  //               } else {
  //                 ways[i][destiny].path += this.nodeData.connectToNode[y].nodeName;
  //                 ways[i][destiny].cost += this.nodeData.connectToNode[y].time;
  //               }
  //               break;
  //             } else {
  //               break;
  //             }
  //           }
  //         }
  //
  //         if (!this.nodeData.deliveryData.destinations[i].totalTimeToDeliver) {
  //           this.nodeData.deliveryData.destinations[i].timeToDeliver = 0;
  //           this.nodeData.deliveryData.destinations[i].totalTimeToDeliver = 0;
  //         }
  //
  //         if (this.nodeData.nodes[y + 1]) {
  //           this.nodeData.nodes[y].connectToNode.forEach(node => {
  //             if (this.nodeData.nodes[y + 1].nodeName === node.node) {
  //               // x2 já contabiliza a volta
  //               this.nodeData.deliveryData.destinations[i].timeToDeliver += node.time;
  //               this.nodeData.deliveryData.destinations[i].totalTimeToDeliver += node.time * 2;
  //             }
  //           });
  //         }
  //       }
  //     }
  //   }
  // }

  refreshPage() {
    window.location.reload();
  }
}
