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

  children() {
    this.nodes.forEach(node => {
      
    });
  }
}

module.exports = DOMNodeCollection;
