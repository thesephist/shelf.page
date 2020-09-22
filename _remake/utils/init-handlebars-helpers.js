import RemakeStore from "../lib/remake-store";
import routeUtils from "../utils/route-utils";
const path = require("upath");

export function initHandlebarsHelpers ({Handlebars}) {
  
  const handlebarsHelpers = require('handlebars-helpers')();

  Handlebars.registerHelper(handlebarsHelpers);

  Handlebars.registerHelper('generateIdIfNone', function(options) {
    return options || "_remake_random_id_";
  });

  // #for 
  // a custom helper that loops over some items
  //
  // IMPORTANT: 
  // if you pass in a named param called `itemName`, you can refer to its 
  // name later in a data-i-new attribute in order to render a new item on 
  // the page
  Handlebars.registerHelper('for', function(context, options) {
    RemakeStore.addNewItemRenderFunction({
      name: options.hash.itemName, 
      func: options.fn,
      appName: RemakeStore.isMultiTenant() ? this.appName : undefined
    });

    // render {{else}} block
    if (!context || context.length === 0) {
      return options.inverse(this);
    }

    // contextItem has the data passed into the helper
    let overallRender = context.map(contextItem => {
      
      // move the context item inside the provided name
      let data = {};
      if (options.hash.itemName) {
        data[options.hash.itemName] = contextItem;
      }

      // render the inner template
      let renderedItem = options.fn(data);

      return renderedItem;
    }).join("");
    
    return overallRender;
  });

  Handlebars.registerHelper('BaseRoute', function(options) {
    if (routeUtils.isBaseRoute(this.params)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('UsernameRoute', function(options) {
    if (routeUtils.isUsernameRoute(this.params)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('ItemRoute', function(options) {
    if (routeUtils.isItemRoute(this.params)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });


}



