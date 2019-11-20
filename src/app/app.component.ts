import { Component, OnInit } from '@angular/core';
import { NodeModel } from './models/node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
              nodeName: node.replace(/\'/gi, '').trim()
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
    // this.destinations.splice(0, 1); // Remove first line (contains destinations index)
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
              time: Number(this.destinations[d1][d2]),
              index: d2
            });
          }
        }
      }
    }
    this.findBestWays();
    this.solve(this.nodeData.nodes);
    console.log(this.nodeData);
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

  findBestWays() {
    const destinies = [];
    this.nodeData.nodes.forEach(node => {
      node.checked = false;
      destinies.push(node);
    });

    return destinies;
  }

  solve(graph) {
    const solutions = {};
    const startPoint = this.nodeData.nodes[0];
    for (let i = 0; i < this.nodeData.nodes.length; i++) {
      solutions[this.nodeData.nodes[i].nodeName] = this.nodeData.nodes[i];
      solutions[this.nodeData.nodes[i].nodeName].distance = 0;
    }

    // tslint:disable-next-line:forin
    for (const n in solutions) {
      let parent = null;
      let nearest = null;
      let dist = Infinity;

      while (!solutions[n].checked) {
        if (!solutions[n]) {
          continue;
        }

        if (!solutions[n].connectToNode || solutions[n].connectToNode.length === 0) {
          break;
        }
        const ndist = solutions[n].distance;
        const adj = graph.filter(t => t.nodeName === n)[0];
        adj.connectToNode.forEach((connectedNode, index) => {
          // const d = connectedNode.time + ndist;
          // let parentNode = Object.keys(solutions).indexOf(n) - 1 as any;
          // if (parentNode !== -1) {
          //   console.log(this.nodeData.nodes[parentNode].nodeName);
          //   parentNode = this.nodeData.nodes[parentNode];
          // } connectedNode.node !== parentNode.nodeName
          const nodePositionIndex = this.nodeData.nodes.findIndex(node => node.nodeName === adj.nodeName);
          if (connectedNode.time + ndist < dist &&
            (connectedNode.index >= nodePositionIndex || nodePositionIndex === this.nodeData.nodes.length - 1)) {
            parent = solutions[n];
            nearest = graph.filter(r => r.nodeName === connectedNode.node)[0];
            dist = connectedNode.time + ndist;
          } else {
            parent = solutions[n];
            nearest = graph.filter(r => r.nodeName === connectedNode.node)[0];
            dist = connectedNode.time + ndist;
          }
          if (index === adj.connectToNode.length - 1) {
            solutions[n].checked = true;
          }
        });
      }

      if (dist === Infinity) {
        break;
      }

      if (!solutions[n].nearest) {
        solutions[n].nearest = '';
      }

      solutions[n].nearest += solutions[n].nodeName + ' | ' + nearest.nodeName + ',';
      solutions[n].distance += dist;
      solutions[n].checked = true;
    }
    console.log(solutions);

    return solutions;
  }

  createDjisktraObj() {

  }

  refreshPage() {
    window.location.reload();
  }
}
