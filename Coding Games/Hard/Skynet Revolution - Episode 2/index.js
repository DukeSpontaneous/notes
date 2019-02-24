class Network {
  constructor(nCount, links, gates) {
    const nodes = new Map();
    for (let i = 0; i < nCount; ++i) {
      const node = {};
      node.name = i;
      node.neighbors = new Set();
      nodes.set(i, node);
    }
    for (let i = 0; i < nCount; ++i) {
      const node = nodes.get(i);
      const ll = links.filter(x => x.n1 == i || x.n2 == i);
      for (let l of ll) {
        const neighborName = l.n1 == i ? l.n2 : l.n1;
        node.neighbors.add(nodes.get(neighborName));
      }
    }
    this.nodes = nodes;
    this.gates = gates.map(x => nodes.get(x));
  }

  moveAgent(n) {
    const ways = [];
    for (let g of this.gates) {
      const w = this.shortestWay(this.nodes.get(n), g);

      if (w.length > 0)
        ways.push(w);
    }
    ways.sort((a, b) => a.length > b.length);

    const w = ways[0];
    this.disneighbors(w[w.length - 1], w[w.length - 2]);
    return w;
  }

  disneighbors(n1, n2) {
    this.nodes.get(n1.name).neighbors.delete(n2);
    this.nodes.get(n2.name).neighbors.delete(n1);
  }

  shortestWay(from, to) {
    const nPool = new Map(this.nodes);

    const way = [from];
    let ways = [way];
    while (ways.length > 0) {
      const wBuf = [];
      while (ways.length > 0) {
        const w = ways.pop();
        const last = w[w.length - 1];
        for (let n of last.neighbors) {
          if (nPool.has(n.name)) {
            nPool.delete(n.name);
            const nw = w.slice();
            nw.push(n);
            if (n == to)
              return nw;

            wBuf.push(nw);
          }
        }
      }
      ways = wBuf;
    }
    return [];
  }
}

var inputs = readline().split(' ');
var N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
var L = parseInt(inputs[1]); // the number of links
var E = parseInt(inputs[2]); // the number of exit gateways
const links = [];
for (var i = 0; i < L; i++) {
  var inputs = readline().split(' ');
  var N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
  var N2 = parseInt(inputs[1]);
  links.push({ n1: N1, n2: N2 });
}
const gates = [];
for (var i = 0; i < E; i++) {
  var EI = parseInt(readline()); // the index of a gateway node
  gates.push(EI);
}

const network = new Network(N, links, gates);
// game loop
while (true) {
  // The index of the node on which the Skynet agent is positioned this turn
  var SI = parseInt(readline());

  const w = network.moveAgent(SI);
  // Write an action using print()
  // To debug: printErr('Debug messages...');

  // Example: 0 1 are the indices of the nodes you wish to sever the link between
  print(`${w[w.length - 1].name} ${w[w.length - 2].name}`);
}