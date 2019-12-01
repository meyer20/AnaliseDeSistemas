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
  solutions = {};
  distances = {};

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
    this.findBestWays();
    this.solve(this.nodeData.nodes);
  }

  calculateDeliveries() {
    this.nextStep();
    // this.orderDeliveryDestiniesByBonus();
    this.orderDeliveryDestiniesByTime();
    this.nodeData.deliveryData.timeWasted = 0;
    this.nodeData.deliveryData.totalBonus = 0;
    this.nodeData.deliveryData.deliveredCount = 0;
    for (let i = 0; i < this.nodeData.deliveryData.destinations.length; i++) {
      const destiny = this.nodeData.deliveryData.destinations[i].destinationNode;
      this.nodeData.deliveryData.destinations[i].done = false;

      if (this.distances[destiny] &&
        this.nodeData.deliveryData.timeWasted <= Number(this.nodeData.deliveryData.destinations[i].time)) {
        this.nodeData.deliveryData.timeWasted += (this.distances[destiny].time * 2);
        this.nodeData.deliveryData.totalBonus += Number(this.nodeData.deliveryData.destinations[i].bonus);
        this.nodeData.deliveryData.deliveredCount++;
        this.nodeData.deliveryData.destinations[i].done = true;
        this.nodeData.deliveryData.destinations[i].deliveredAt = this.nodeData.deliveryData.timeWasted;
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
    this.solutions[this.nodeData.nodes[0].nodeName] = this.nodeData.nodes[0];
    this.solutions[this.nodeData.nodes[0].nodeName].distance = 0;

    for (let n = 0; n < this.nodeData.nodes.length; n++) {
      let parent = null;
      let nearest = null;
      let dist = Infinity;
      let whileCounter = 0;

      while (!this.nodeData.nodes[n].checked) {
        if (!this.nodeData.nodes[n]) {
          continue;
        }

        if (this.nodeData.nodes[n].connectToNode.length === 0) {
          break;
        }
        const ndist = this.nodeData.nodes[n].distance;
        this.nodeData.nodes[n].connectToNode.forEach(connectedNode => {
          whileCounter++;
          const d = connectedNode.time + ndist;
          if (d < dist && (!this.solutions[connectedNode.node] || n === this.nodeData.nodes.length - 1)) {
          // if (d < dist && n !== this.nodeData.nodes.length - 1) {
            parent = this.nodeData.nodes[n];
            nearest = graph.filter(r => r.nodeName === connectedNode.node)[0];
            dist = d;
            this.nodeData.nodes[n].checked = true;
          } else if (n === this.nodeData.nodes.length - 1) {
            this.nodeData.nodes[n].checked = true;
          }
        });

        if (whileCounter >= this.nodeData.nodes[n].connectToNode.length - 1) {
          this.nodeData.nodes[n].checked = true;
        }
      }

      if (dist === Infinity) {
        break;
      }

      if (!this.nodeData.nodes[n].nearest) {
        this.nodeData.nodes[n].nearest = '';
      }

      this.nodeData.nodes[n].nearest += nearest.nodeName;
      let incrementalDistance = 0;
      if (n > 0) {
        incrementalDistance = this.solutions[this.nodeData.nodes[n].connectToNode[0].node].distance;
      }
      this.nodeData.nodes[n].distance = dist + incrementalDistance;
      this.nodeData.nodes[n].checked = true;
      if (this.nodeData.nodes[n + 1]) {
        this.solutions[this.nodeData.nodes[n + 1].nodeName] = this.nodeData.nodes[n + 1];
        this.solutions[this.nodeData.nodes[n + 1].nodeName].distance = 0;
      } else {
        break;
      }
    }

    this.createDistancesTable();

    return this.solutions;
  }

  createDistancesTable() {
    const startPoint = this.nodeData.nodes[0];
    this.distances[startPoint.nodeName] = {
      time: 0,
      path: null
    };
    startPoint.connectToNode.forEach(childNode => {
      this.connectPoints(this.distances, childNode);
      if (this.solutions[childNode.node].connectToNode && this.solutions[childNode.node].connectToNode.length) {
        // this.connectPoints(teste, childNode);
        // if (teste[childNode.node] === undefined) {
        //   teste[childNode.node] = {
        //     time: childNode.time,
        //     path: childNode.node
        //   };
        //   this.solutions[childNode.node].connectToNode.forEach(connection => {
        //     if (teste[connection.node] === undefined) {
        //       teste[connection.node] = {
        //         time: childNode.time + connection.time,
        //         path: childNode.node + connection.node
        //       };
        //     }
        //   });
        // }
      }
    });
    // Object.keys(teste).forEach(node => {
    //   if (this.solutions[node] && this.solutions[node].connectToNode && this.solutions[node].connectToNode.length) {
    //     this.solutions[node].connectToNode.forEach(item => {
    //       this.connectPoints(teste, item);
    //     });
    //   }
    // });
  }

  connectPoints(distances, childNode) {
    if (distances[childNode.node] === undefined) {
      distances[childNode.node] = {
        time: childNode.time,
        path: childNode.node
      };
      this.solutions[childNode.node].connectToNode.forEach(connection => {
        if (distances[connection.node] === undefined) {
          distances[connection.node] = {
            time: childNode.time + connection.time,
            path: childNode.node + connection.node
          };
        }
        this.connectPoints(distances, connection);
      });
    }
  }

  orderDeliveryDestiniesByBonus() {
    this.nodeData.deliveryData.destinations.sort((a, b) => {
      if (Number(a.bonus) > Number(b.bonus)) {
        return -1;
      } else if (Number(a.bonus) < Number(b.bonus)) {
        return 1;
      } else {
        if (Number(a.bonus) > Number(b.bonus)) {
          return -1;
        } else if (Number(a.bonus) < Number(b.bonus)) {
          return 1;
        }
        return 0;
      }
    });
  }

  orderDeliveryDestiniesByTime() {
    this.nodeData.deliveryData.destinations.sort((a, b) => {
      if (Number(a.time) < Number(b.time)) {
        return -1;
      } else if (Number(a.time) > Number(b.time)) {
        return 1;
      } else {
        if (Number(a.time) < Number(b.time)) {
          return -1;
        } else if (Number(a.time) > Number(b.time)) {
          return 1;
        }
        return 0;
      }
    });
  }

  refreshPage() {
    window.location.reload();
  }
}
