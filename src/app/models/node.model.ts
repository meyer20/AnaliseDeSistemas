export class NodeModel {
  nodeLength: number;
  nodes: Array<{
    nodeName: string,
    connectToNode: string,
    distance: number
  }>;
  deliveryData: {
    deliveryStartPoint: string,
    deliveriesLength: number,
    destinations: Array<{
      time: number,
      destinationNode: string,
      bonus: number
    }>
  };
}
