// -----------------------------------------------------------------------------
// Milestone 11.1 - Function Reference vs Function Call
// -----------------------------------------------------------------------------

// A function call executes the function immediately.
// A function reference points to the function without executing it.
//
// This difference is important when we start learning callbacks.

function addToCart(): void {
  console.log("Product added to cart");
}

function addToFavorite(): void {
  console.log("Product added to favorites");
}

function deleteProduct(): void {
  console.log("Product deleted");
}

addToCart(); // Function call - executes the function now
addToCart; // Function reference - does not execute the function

// Why is this difference important in callbacks?
// -----------------------------------------------------------------------------

// In callbacks, there are two separate steps:
// 1. Give the function to another function: //    runAction(addToCart);
// 2. Run that function later: //    action();

// We are using `any` here on purpose. At this stage, the goal is not typing callbacks yet.
// The goal is only to understand that a function can be passed and run later.

function runAction(action: any): void {
  action(); // The important line: run the function that was given to me.
}

// Direct function calls:
addToCart();
addToFavorite();
deleteProduct();

// Callback examples:
runAction(addToCart);
runAction(addToFavorite);
runAction(deleteProduct);

// Important:
// runAction(addToCart); Correct: we pass the function itself.
//
// runAction(addToCart()); Wrong for this example: addToCart runs immediately, and its result is passed.

// -----------------------------------------------------------------------------
// Is the name `action` special? No. We can use another parameter name.
// For example, this function works the same way:

function runAction2(callback: any): void {
  callback();
}

runAction2(addToCart);

// Why not just write addToCart() directly? If we write the function like this, it can only run addToCart:

function runAction3(): void {
  addToCart();
}

runAction3();

// But with a callback, the function can run different actions:

function runAction4(action: any): void {
  action();
}

runAction4(addToCart);
runAction4(addToFavorite);
runAction4(deleteProduct);

// -----------------------------------------------------------------------------
// Mini case - shared button click flow
// -----------------------------------------------------------------------------

function runButtonClick(action: any): void {
  console.log("Button clicked");

  action();

  console.log("Action completed");
}

runButtonClick(addToCart);
runButtonClick(addToFavorite);
runButtonClick(deleteProduct);
