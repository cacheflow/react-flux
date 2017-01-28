/** jsx dom */
let dom = (tag, attrs, ...children) => {
  return {tag, attrs, children}
}


const list = (
  <ul class="list">
    <li> Hope </li>
    <li> This </li>
    <li> Works </li>
  </ul>
)

let createElement = (node) => {
  if(typeof node == 'string') {
    return document.createTextNode(node)
  }
  let el = document.createElement(node.tag)
  for(var i = 0; i < node.children.length; i++) {
    el.appendChild(createElement(node.children[i]))
  }
  return el
}

let updateElement = (parent, newNode, oldNode, index = 0) => {
  if(!oldNode) {
    let newElement = createElement(newNode)
    parent.appendChild(newElement)
  }
  else if(!newNode) {
    parent.removeChild(parent.childNodes[index])
  }

  else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), parent.childNodes[index])
  }
  else if(newNode.type) {
    const newLength = newNode.children.length;
    const oldLenghth = oldNode.children.length;
    for(let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}

let changed = (nodeOne, nodeTwo) => {
  return typeof nodeOne !== typeof nodeTwo ||
  typeof nodeOne === 'string' && nodeOne != nodeTwo ||
  nodeOne.type !== nodeTwo.type
}


const app = document.getElementById('app')
app.appendChild(createElement(list))
