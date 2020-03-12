//Only Required client side

export default (ns_string) => {
    var parts = ns_string && ns_string.split('.'),
      parent = window || {},
      pl, i;

    pl = parts.length;
    for (i = 0; i < pl; i++) {
      //create a property if it doesn't exist
      if (typeof parent[parts[i]] == 'undefined') {
        parent[parts[i]] = {};
      }

      parent = parent[parts[i]];
    }
    
    return parent;
};


