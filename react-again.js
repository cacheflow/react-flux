//Our DOM elements with javascript objects
/** jsx dom */

let dom = (tag, attrs, ...children) => {
  if (typeof (tag) =='function') {
    attrs = attrs || {}
    attrs.children = children
    console.log(tag(attrs))
    return tag(attrs)
  }
  else {
    if(children.length > 1) {
      for(var i in children) {
        var child = children[i]
        if(child && typeof(child) != 'object') {
          children[i] = dom('span', null, child.toString())
        }
      }
    }
  }
  return {tag, attrs, children}
}

let list = (
  <ul className="list">
    <li> Hope this works </li>
    <li> Bet it will not work </li>
    <li> I hate jury duty </li>
  </ul>
)

let root = document.getElementById('app')
