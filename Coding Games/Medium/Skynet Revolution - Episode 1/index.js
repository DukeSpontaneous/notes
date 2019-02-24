class Network {
  constructor(nodesCount, links, gates) {
    let nodes = new Array(nodesCount)
      .fill(null)
      .map(() => new Set());
    nodes.forEach((neighbors, name) => {
      neighbors.name = name;
      links
        .filter(l => l.N1 === name || l.N2 === name)
        .forEach(l => {
          const neighborName = l.N1 === name ? l.N2 : l.N1;
          neighbors.add(nodes[neighborName]);
        });
    });

    this._nodes = nodes;
    this._gates = gates.map(gate => nodes[gate]);
  }

  nextTurn(agentNode) {
    const ways = [];
    const from = this._nodes[agentNode];
    for (let gate of this._gates) {
      const way = this._shortestWay(from, gate);
      way && ways.push(way);
    }
    if (ways.length < 1)
      throw new Error(`There is no way to the gate!`);
    ways.sort((a, b) => a.length > b.length);
    const shortest = ways[0];

    const [node1, node2] = shortest;
    this._disneighbors(node1, node2);
    return [node1, node2];
  }

  _shortestWay(from, to) {
    const nodesPool = new Set(this._nodes);

    let ways = [[from],];
    while (ways.length > 0) {
      const generation = [...ways];
      ways = [];

      for (let way of generation) {
        const lastNode = way[way.length - 1];
        for (let neighbor of lastNode) {
          if (nodesPool.delete(neighbor)) {
            const newWay = [...way, neighbor];
            if (neighbor === to)
              return newWay;
            ways.push(newWay);
          }
        }
      }
    }
    return null;
  }

  _disneighbors(node1, node2) {
    node1.delete(node2);
    node2.delete(node1);
  }
}

{
  // N - the total number of nodes in the level, including the gateways
  // L - the number of links
  // E - the number of exit gateways
  const [N, L, E] = readline()
    .split(' ')
    .map(str => parseInt(str));

  const links = [];
  for (let i = 0; i < L; ++i) {
    const [N1, N2] = readline()
      .split(' ')
      .map(str => parseInt(str));
    links.push({ N1, N2 }); // N1 and N2 defines a link between these nodes
  }

  const gates = [];
  for (let i = 0; i < E; i++) {
    const EI = parseInt(readline());
    gates.push(EI); // the index of a gateway node
  }

  const network = new Network(N, links, gates);
  // game loop
  while (true) {
    // The index of the node on which the Skynet agent is positioned this turn
    const SI = parseInt(readline());
    const [node1, node2] = network.nextTurn(SI);
    // Write an action using print()
    // To debug: printErr('Debug messages...');

    // Example: 0 1 are the indices of the nodes you wish to sever the link between
    print(`${node1.name} ${node2.name}`);
  }
}
