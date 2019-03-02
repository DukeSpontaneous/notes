class Network {
  constructor(nodesCount, links, gates) {
    const nodes = new Array(nodesCount)
      .fill(null)
      .map((item, name) => ({ name, neighbors: new Set() }));
    nodes.forEach(({ name, neighbors }) => {
      links
        .filter(({ N1, N2 }) => N1 === name || N2 === name)
        .forEach(({ N1, N2 }) => {
          const neighborName = N1 === name ? N2 : N1;
          neighbors.add(nodes[neighborName]);
        });
    });

    this._nodes = nodes;
    this._gates = gates.map(gate => nodes[gate]);
  }

  nextTurn(agentNodeName) {
    const dangerousLink = this._getMostDangerousLink(this._nodes[agentNodeName]);
    const [node1, node2] = dangerousLink;
    this._disneighbors(node1, node2);
    return `${node1.name} ${node2.name}`;
  }

  _getMostDangerousLink(agentNode) {
    const { neighbors } = agentNode;
    const dangerousGate = [...neighbors.values()]
      .find(neighbor => this._gates.includes(neighbor));
    if (dangerousGate) {
      printErr(`Danger p1: neighboring Gate`);
      return [agentNode, dangerousGate];
    }

    const dangerousNodeWays = this._nodes
      .map(node => ({
        name: node.name,
        gatesCount: this._getLinkedGates(node).length,
      }))
      .filter(info => info.gatesCount > 1)
      .map(({ name, gatesCount }) => {
        printErr(`Node №${name} is dangerous! Gates count: ${gatesCount}`);
        return this._nodes[name];
      })
      .map(node => this._shortestWay(node, agentNode))
      .map(way => {
        printErr(`Dangerous way:`);
        printErr(way.reduce((acc, n) => `${acc} ${n.name}`, ``));
        const safeWay = way.filter(node => this._getLinkedGates(node).length < 1);
        const safety = safeWay.length;
        printErr(`Safe way:`);
        printErr(safeWay.reduce((acc, n) => `${acc} ${n.name}`, ``));
        return ({ way, safety });
      })
      .sort((a, b) => a.safety - b.safety)
      .map(obj => obj.way);
    const dangerousNode = dangerousNodeWays[0] && dangerousNodeWays[0][0];
    if (dangerousNode) {
      printErr(`Danger p2: multiple Gate node`);
      return [dangerousNode, this._getLinkedGates(dangerousNode)[0]];
    }

    const shortestWayToGate = this._gates
      .filter(({ neighbors }) => [...neighbors.values()].length > 0)
      .map(gate => this._shortestWay(gate, agentNode))
      .sort((a, b) => a.length - b.length)
    [0];
    printErr(`Danger p3: the remaining links to the nearest Gate`);
    return [shortestWayToGate[0], shortestWayToGate[1]];
  }

  _shortestWay(from, to) {
    const nodesPool = new Set(this._nodes);

    let ways = [[from],];
    while (ways.length > 0) {
      const generation = [...ways];
      ways = [];

      for (let way of generation) {
        const lastNode = way[way.length - 1];
        for (let neighbor of lastNode.neighbors) {
          if (nodesPool.delete(neighbor)) {
            const newWay = [...way, neighbor];
            if (neighbor === to) {
              return newWay;
            } else if (this._gates.includes(neighbor) === false) {
              ways.push(newWay);
            }
          }
        }
      }
    }
    return null;
  }

  _disneighbors(node1, node2) {
    node1.neighbors.delete(node2);
    node2.neighbors.delete(node1);
  }

  _getLinkedGates(node) {
    const { neighbors } = node;
    return [...neighbors.values()]
      .filter(neighbor => this._gates.includes(neighbor));
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
  for (let i = 0; i < E; ++i) {
    const EI = parseInt(readline());
    gates.push(EI); // the index of a gateway node
  }

  const network = new Network(N, links, gates);
  // game loop
  while (true) {
    // The index of the node on which the Skynet agent is positioned this turn
    const SI = parseInt(readline());

    // Write an action using print()
    // To debug: printErr('Debug messages...');

    // Example: 0 1 are the indices of the nodes you wish to sever the link between
    print(network.nextTurn(SI));
  }
}
