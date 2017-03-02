/** jsx dom */

let dom = (type, props, ...children) =>  {
  return {type, props: props || {}, children}
}

let createElement = (node) => {
  if(typeof node == 'string') {
    return document.createTextNode(node)
  }
  let el = document.createElement(node.type)
  setProps(el, node.props)
  node.children.forEach(child => el.appendChild(createElement(child)))
  return el
}

let setProps = (target, props) => {
  Object.keys(props).forEach(name => setProp(target, name, props[name]))
}

let isCustomProp = (name) => {
  return false;
}

let setProp = (target, name, value) => {
  if(isCustomProp(name)) {
    return;
  }
  else if(name == 'className') {
    target.setAttribute('class', value)
  }
  else if(typeof name == 'boolean') {
    setBooleanProp(target, name, value)
  }
  else {
    target.setAttribute(name, value)
  }
}

let updateProp = (target, name, newVal, oldVal) => {
  if(!newVal) {
    removeProp(target, name, oldVal)
  }
  else if(!oldVal || newVal !== oldVal) {
    addProp(target, name, newVal)
  }
}

let updateProps = (target, newProps, oldProps = {}) => {
  let props = Object.assign({}, newProps, oldProps)
  Object.keys(props).forEach(name => {
    updateProp(target, name, newProps[name], oldProps[name])
  })
}


let updateElement = (parentElement, newElement, oldElement, index = 0) => {
  if(!oldElement) {
    parentElement.appendChild(createElement(newElement))
  }
  else if(!newElement) {
    parentElement.removeChild(parentElement.childNodes[index])
  }
  else if(changed(newElement, oldElement)) {
    parentElement.replaceChild(createElement(newElement), parentElement.childNodes[index])
  }
  else if(newElement.constructor == Object) {
    for(var i = 0; i < newElement.children.length || i < oldElement.children.length; i+=1) {
      updateElement(
        parentElement.childNodes[index],
        newElement.children[i],
        oldElement.children[i],
        i
      )
    }
  }
}

let setBooleanProp = (target, name, value) => {
  if(value == true) {
    target.setAttribute(name, value)
    target[name] = true
  }
  else {
    target.setAttribute(name, value)
    target[name] = false
  }
}


let changed = (nodeOne, nodeTwo) => {
  let ensureStringsDoNotMatch = (typeof nodeOne == 'string' || typeof nodeTwo == 'string') && (nodeOne != nodeTwo)
  let ensureTypesDoNotMatch  = (typeof nodeOne != typeof nodeTwo)
  let elementTypesDoNotMatch = (nodeOne.type != nodeTwo.type)
  let result = [ensureTypesDoNotMatch, ensureStringsDoNotMatch, elementTypesDoNotMatch].reduce((prev, curr) => {
    return prev || curr
  })
  return result
}

const a = (
  <ul style="list-style: none;">
    <li className="item">item 1</li>
    <li className="item-two"> Wow </li>
  </ul>
);

const b = (
  <ul style="list-style: none;">
    <li className="item">New Item</li>
    <li className="item-two"> Second Item </li>
  </ul>
);

let removeBooleanProp = (target, name) => {
  target.removeAttribute(name)
  target[name] = false
}

let removeProp = (target, name, value) => {
  if(isCustomProp(name)) {
    return;
  }
  else if(name == 'className') {
    target.removeAttribute('class')
  }
  else if(typeof value === 'boolean') {
    removeBooleanProp(target, name)
  }
  else {
    target.removeChild(name)
  }
}


const $root = document.getElementById('root');
const $diff = document.getElementById('diff');
const $undiff = document.getElementById('undiff');

$root.appendChild(createElement(a))

$diff.addEventListener('click', () => {
  updateElement($root, b, a);
});
