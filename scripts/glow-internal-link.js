/* Causes the elements linked to by internal links glow when the link is clicked
 *
 */
$(function () {
  var links = document.getElementsByTagName('a');

  for (var i=0; i<links.length; i++) {
    var link = links[i];
    var href = link.href;
    var hashIndex = href.indexOf('#');
    if (hashIndex > 0) {  // means this link links internally to an element
      var targetId = href.slice(hashIndex + 1);  // get the id of the linked element
      var element = document.getElementById(targetId);
      element.addEventListener("transitionend", removeGlowClasses.bind(element));

      // when link is clicked, element glows then fades
      link.addEventListener("click", callbackClosure(element, function(a) {
        a.classList.add("glow");
        setTimeout(function () {  // begin transition to not-glowing after 0.5s
          a.classList.add("stop-glow");
        }, 500);
      }));
    }
  }

  // removes the glow classes from this element so it can glow again later
  function removeGlowClasses() {
    this.classList.remove('glow', 'stop-glow');
  }

  // creates a separate callback function with its own copy of value in a scope only available to them
  function callbackClosure(value, callback) {
    return function() {
      return callback(value);
    }
  }
});
