export default class Utils {}

Utils.isEmployer = (user) => {
  return user && user.role === "employer";
}

Utils.getUserToken = () => {
  return JSON.parse(localStorage.getItem('qcUserToken')) || "";
}

Utils.setUserToken = (token) => {
  localStorage.setItem('qcUserToken', JSON.stringify(token));
}

Utils.isApplicant = (user) => {
  return user && user.role === "applicant";
}

Utils.isSignedIn = () => {
  return localStorage.getItem('qcUserToken') &&
    localStorage.getItem('qcUserToken') !== 'undefined'
}

Utils.setCart = (cart) => {
  // store user in local storage
  localStorage.setItem('qcCart', JSON.stringify(cart));
}

Utils.getCart = (cart) => {
  // store user in local storage
  return JSON.parse(localStorage.getItem('qcCart')) || '{}';
}

Utils.getSearchUrl = (keywords, location) => {
  let url = '/jobs'
  if (keywords || location) {
    url += '?'
    if (keywords) { url += `keywords=${keywords}` }
    if (keywords && location) { url += '&' }
    if (location && location !== '' ) { url += `location=${location}`}
  }
  return url
}

Utils.stripHtml = (rawHtml) => {
  return rawHtml && rawHtml.replace(/(<\/?(?:a|p|br)[^>]*>)|<[^>]+>/ig, '$1');
}

Utils.stripHtmlForTeaser = (rawHtml) => {
  return rawHtml.replace(/(<\/?(?:a)[^>]*>)|<[^>]+>/ig, '$1');
}

Utils.uppercase = (string) => {
  let stringParts = string.split(' ');
  const newString = stringParts
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return newString;
}

Utils.currencyFormatter = (value, precision = 0) => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: precision,
  });
  return formatter.format(value);
}

Utils.getProducts = () => {
  return [
    { display: 'Purchase in Bulk and Save!', value: 0 },
    { display: '1 job post @ $299 each', id: 1, quantity: 1, value: 299 },
    { display: '2 job posts @ $285 each', id: 2, quantity: 2, value: 285 },
    { display: '3 job posts @ $265 each', id: 3, quantity: 3, value: 265 },
    { display: '4 job posts @ $245 each', id: 4, quantity: 4, value: 245 },
    { display: '5 - 10 job posts @ $225 each', id: 5, quantity: 5, value: 225 }
  ];
}

Utils.getProductTotal = (productId, quantity = null) => {
  let total;
  const product = Utils.getProduct(productId);
  if (quantity) {
    total = product ? parseInt(quantity, 10) * parseInt(product.value, 10) : 0;
  } else {
    total = product ? parseInt(product.quantity, 10) * parseInt(product.value, 10) : 0;
  }
  return Utils.currencyFormatter(total, 2);
}

Utils.getProduct = productId => {
  return Utils.getProducts().filter(product => product.id === parseInt(productId, 10))[0]
}

Utils.getProductByQuantity = quantity => {
  return Utils.getProducts().filter(product => {
    return product.quantity === parseInt(quantity, 10) ||
      (product.quantity >= 5 && parseInt(quantity, 10) >= 5)
  })[0];
}

Utils.isJobOwner = job => {
  return parseInt(job.user_id, 10) === parseInt(Utils.getCurrentUser().id, 10)
}

// removes empty attributes with empty values
Utils.clean = (obj) => {
  for (var propName in obj) {
    var shouldDelete = obj[propName] === null || obj[propName] === undefined ||
      obj[propName] === "" || Array.isArray(obj[propName]) &&
      obj[propName].length == 0;
    if (shouldDelete) { delete obj[propName] }
  }
  return obj;
}

Utils.resetJobsFilter = () => {
  localStorage.removeItem("jobFilters");
  var filterContainer = document.getElementById('jobs-filter')
  var checkboxes = filterContainer && filterContainer.getElementsByTagName('Input')
  checkboxes && Array.from(checkboxes).forEach(input => input.checked = false)
}
