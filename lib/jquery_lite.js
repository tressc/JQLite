/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
      if (!Array.isArray(node[type])) {
        node[type] = [];
      }
      node.addEventListener(type, action);
      node[type].push(action);
    });
  }

  off(type) {
    this.nodes.forEach(node => {
      node[type].forEach(action => {
        node.removeEventListener(type, action);
      });
      node[type] = [];
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);