export class NodeModel {
  nodeLength: number;
  nodes: Array<{
    nodeName: string,
    connectToNode: Array<{
      node: string,
      time: number
    }>,
    distance: number
  }>;
  deliveryData: {
    deliveryStartPoint: string,
    deliveriesLength: number,
    destinations: Array<{
      time: number,
      destinationNode: string,
      bonus: number,
      timeToDeliver: number,
      totalTimeToDeliver: number
    }>
  };
}
