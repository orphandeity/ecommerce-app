export function getImageModuleById(imageModules, id) {
  let imagePath = `../assets/images/product_${id}.jpg`;
  let modulePath = imageModules[imagePath];
  if (!modulePath) {
    throw new Error(`Image module not found for id ${id}`);
  }
  return modulePath().then((module) => module.default);
}
