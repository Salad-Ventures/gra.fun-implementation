// Parse URL parameters
function getUrlParams(url) {
  const params = new URL(url).searchParams;
  return {
    name: params.get("name"),
    symbol: params.get("symbol"),
    description: params.get("description"),
    image: params.get("image"),
  };
}

// Extract parameters from the current URL
const urlParams = getUrlParams(window.location.href);

// Function to set input/textarea values and trigger events to update framework state
function setFieldValue(selector, value) {
  const field = document.querySelector(selector);
  if (field) {
    const nativeValueSetter = Object.getOwnPropertyDescriptor(
      field.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype,
      "value"
    ).set;

    nativeValueSetter.call(field, value);

    // Trigger input and change events to notify the framework
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  } else {
    console.error(`Element not found for selector: ${selector}`);
  }
}

// Populate the form fields
if (urlParams.name) {
  setFieldValue("#token-name", urlParams.name); // Token Name
}
if (urlParams.symbol) {
  setFieldValue("#token-symbol", urlParams.symbol); // Token Symbol
}
if (urlParams.description) {
  setFieldValue(
    "#token-description",
    decodeURIComponent(urlParams.description)
  ); // Description
}

// Upload the token image
if (urlParams.image) {
  fetch(urlParams.image)
    .then((response) => response.blob())
    .then((blob) => {
      const file = new File([blob], "token-image.png", { type: blob.type });
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        // Trigger change event to notify the framework
        fileInput.dispatchEvent(new Event("change", { bubbles: true }));
        console.log("Image uploaded successfully:", fileInput.files[0]);
      } else {
        console.error("File input field not found.");
      }
    })
    .catch((error) => console.error("Error uploading image:", error));
}

console.log("Form fields populated from URL:", urlParams);
