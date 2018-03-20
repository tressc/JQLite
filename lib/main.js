const DOMNodeCollection = require("./dom_node_collection");

let pageLoaded = false;

let eventQueue = [];

document.addEventListener("DOMContentLoaded", () => {
  pageLoaded = true;
  eventQueue.forEach(event => {
    event();
  });
  eventQueue = [];
});

window.$l = (arg) => {
  switch (typeof arg) {
    case "string":
      return getNodesFromDom(arg);
    case HTMLElement:
      return new DOMNodeCollection(arg);
    case Function:
      if (pageLoaded) {
        arg();
      } else {
        eventQueue.push(arg);
      }
  }
};

const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};

window.$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      base[key] = obj[key];
    });
  });
  return base;
};

window.$l.ajax = (options) => {
  let defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };

  options = window.$l.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(options.data));
};
