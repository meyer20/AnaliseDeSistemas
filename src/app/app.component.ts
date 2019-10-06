import { Component, OnInit } from '@angular/core';
import { NodeModel } from './models/node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AnaliseSistemas';
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
        console.log(fileReader.result);
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
    fileContent = fileContent.split('\n');
    console.log(fileContent);
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
    console.log(this.nodeData);
  }

  setNodesConnections() {
    for (let d1 = 0; d1 < this.destinations.length; d1++) {
      let shouldBreak = false;
      for (let d2 = d1; d2 < this.destinations[d1].length; d2++) {
        if (Number(this.destinations[d1][d2]) !== 0) {
          this.nodeData.nodes[d1].connectToNode = this.nodeData.nodes[d2].nodeName;
          this.nodeData.nodes[d1].distance = Number(this.destinations[d1][d2]);
          shouldBreak = true;
          break;
        } else if (d2 === this.nodeData.nodeLength - 1) {
          this.nodeData.nodes[this.nodeData.nodeLength - 1].connectToNode = this.nodeData.nodes[0].nodeName;
          this.nodeData.nodes[this.nodeData.nodeLength - 1].distance = Number(this.destinations[this.nodeData.nodeLength - 1][0]);
        }
      }
    }
  }
}
