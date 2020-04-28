// flatten - flatmap
export function flattenProducts(data) {
  return data.map((item) => {
    //cloudinary
    let image = item.image.url;
    // local setup no deployment
    // let image = `${url}${item.image.url}`
    return { ...item, image };
  });
}

// helper functions - ls 233
export function featuredProducts(bestsellers) {
  return bestsellers.filter((item) => {
    return item.featured === true;
  });
}
