class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(hypertext) {
    if (hypertext) {
      this.nodes.forEach(node => {
        node.innerHTML = hypertext;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.nodes.forEach(node => {
      node.innerHTML = "";
    });
  }

  append(children) {
    if (children instanceof DOMNodeCollection) {
      this.nodes.forEach(node => {
        children.nodes.forEach(child => {
          node.appendChild(child.cloneNode(true));
        });
      });
    } else if (typeof children === "string") {
      this.nodes.forEach(node => {
        node.innerHTML += children;
      });
    }
  }

  // Traversal Methods

  children() {
    let childNodes = [];
    this.nodes.forEach(node => {
      childNodes = childNodes.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(childNodes);
  }

  parents() {
    let parentNodes = [];
    this.nodes.forEach(node => {
      if (!parentNodes.includes(node.parentNode)) {
        parentNodes.push(node.parentNode);
      }
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let foundNodes = [];
    this.nodes.forEach(node => {
      const nodeList = node.querySelectorAll(selector);
      nodeList.forEach(listedNode => {
        if (!foundNodes.includes(listedNode)) {
          foundNodes.push(listedNode);
        }
      });
    });
    return new DOMNodeCollection(foundNodes);
  }

  remove() {
    this.nodes.forEach(node => {
      node.parentNode.removeChild(node);
    });
  }

  // Event Handling

  on(type, action) {
    this.nodes.forEach(node => {
      node.addEventListener(type, action);
    });
  }

  off
}

module.exports = DOMNodeCollection;
