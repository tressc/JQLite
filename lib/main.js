const DOMNodeCollection = require("./dom_node_collection");

window.$l = (arg) => {
  switch (typeof arg) {
    case "string":
      return getNodesFromDom(arg);
    case HTMLElement:
      return new DOMNodeCollection(arg);
  }
};

const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};
