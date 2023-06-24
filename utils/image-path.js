const imagePath = (product) => {
  let splittedImagePath;
  if (product.image_art[6] == "\\") {
    splittedImagePath = product.image_art.split("\\");
  } else {
    splittedImagePath = product.image_art.split("/");
  }
  const slicedImagePath = splittedImagePath.slice(1);
  const joinedImagePath = slicedImagePath.join("/");
  return joinedImagePath;
};

module.exports = { imagePath };
