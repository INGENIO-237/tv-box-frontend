const imagePath = (product) => {
  if (product.image_art == "\\") {
    const splittedImagePath = product.image_art.split("\\");
    const slicedImagePath = splittedImagePath.slice(1);
    const joinedImagePath = slicedImagePath.join("/");

    return joinedImagePath;
  }
};

module.exports = { imagePath };
