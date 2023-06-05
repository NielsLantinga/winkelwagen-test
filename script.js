let selectedSizeButton = null;

function setSelectedSize(button, size) {
  if (selectedSizeButton) {
    selectedSizeButton.classList.remove('selected');
  }
  
  button.classList.add('selected');
  selectedSizeButton = button;
}

function addToCartWithSelectedSize(productName, price) {
  if (selectedSizeButton) {
    const size = selectedSizeButton.textContent;
    addToCart(productName, price, size);
  } else {
    console.log('Selecteer eerst een maat.');
  }
}
