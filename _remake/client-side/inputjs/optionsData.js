let elemProps = ["id", "className", "type", "src", "href", "value", "checked", "innerText", "innerHTML", "style", "title", "alt", "for", "placeholder"];

export default {

  // default watch functions
  watchFunctions: {
    "*": function ({watchElem, watchAttrName, camelCaseKeyName, value, dataSourceElem, watchFuncName, watchFuncArgs, dataTargetElem}) {
      
      // if func is a valid elem property, set that prop to the new value (allow nested props like "style.backgroundColor")
      let listOfProps = watchFuncName.split(".");

      // check to make sure it's a valid elem property
      if (elemProps.includes(listOfProps[0])) {
        let currentObj = watchElem;
        listOfProps.forEach((propName, index) => {
          if (index + 1 < listOfProps.length) {
            // set nested prop, e.g. "style" in the full prop string "style.backgroundColor"
            currentObj = currentObj[propName];
          } else {
            currentObj[propName] = value;
          }
        }); 
      }

      // if func is a data attribute, set the first arg as its value
      if (watchFuncName.startsWith("data-")) {
        watchElem.setAttribute(watchFuncName, value);
      }

    }
  }
};



