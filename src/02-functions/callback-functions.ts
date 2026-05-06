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

function removeProduct(): void {
  console.log("Product removed");
}

addToCart(); // Function call - executes the function now
addToCart; // Function reference - does not execute the function

// -----------------------------------------------------------------------------
// Why is this difference important in callbacks?
// -----------------------------------------------------------------------------

// In callbacks, there are two separate steps:
//
// 1. Give the function to another function:
//    runAction(addToCart);
//
// 2. Run that function later:
//    action();

// We are using `any` here on purpose.
// At this stage, the goal is not typing callbacks yet.
// The goal is only to understand that a function can be passed and run later.

function runAction(action: any): void {
  action(); // The important line: run the function that was given to me.
}

// Direct function calls:
addToCart();
addToFavorite();
removeProduct();

// Callback examples:
runAction(addToCart);
runAction(addToFavorite);
runAction(removeProduct);

// Important:
//
// runAction(addToCart);
// Correct: we pass the function itself.
//
// runAction(addToCart());
// Wrong for this example: addToCart runs immediately, and its result is passed.

// -----------------------------------------------------------------------------
// Is the name `action` special?
// -----------------------------------------------------------------------------
// No. We can use another parameter name.
// For example, this function works the same way:

function runAction2(callback: any): void {
  callback();
}

runAction2(addToCart);

// -----------------------------------------------------------------------------
// Why not just write addToCart() directly?
// -----------------------------------------------------------------------------
// If we write the function like this, it can only run addToCart:

function runOnlyAddToCart(): void {
  addToCart();
}

runOnlyAddToCart();

// But with a callback, the function can run different actions:

function runAnyAction(action: any): void {
  action();
}

runAnyAction(addToCart);
runAnyAction(addToFavorite);
runAnyAction(removeProduct);

// -----------------------------------------------------------------------------
// Mini case - shared button click flow
// -----------------------------------------------------------------------------
// This function represents a common flow:
//
// 1. The user clicks a button.
// 2. We run the action.
// 3. We show that the action is completed.

function runButtonClick(action: any): void {
  console.log("Button clicked");

  action();

  console.log("Action completed");
}

runButtonClick(addToCart);
runButtonClick(addToFavorite);
runButtonClick(removeProduct);

// -----------------------------------------------------------------------------
// Confirmation flow
// -----------------------------------------------------------------------------
// Same callback idea:
//
// 1. Show a confirmation message.
// 2. Run the action.
// 3. Show a completion message.

function deleteProduct(): void {
  console.log("Product deleted");
}

function cancelOrder(): void {
  console.log("Order cancelled");
}

function deleteCustomer(): void {
  console.log("Customer deleted");
}

function confirmAndRun(action: any): void {
  console.log("Are you sure you want to do this?");

  action();

  console.log("Confirmed action completed");
}

confirmAndRun(deleteProduct);
confirmAndRun(cancelOrder);
confirmAndRun(deleteCustomer);

// -----------------------------------------------------------------------------
// Loading flow
// -----------------------------------------------------------------------------
// Same callback idea again:
//
// 1. Show loading.
// 2. Run the action.
// 3. Hide loading.

function saveProduct(): void {   
    console.log("Product saved"); 
}

function sendOrder(): void {
  console.log("Order sent");
}

function updateCustomer(): void {
  console.log("Customer updated");
}

function runWithLoading(action: any): void {
  console.log("Loading started");

  action();

  console.log("Loading finished");
}

runWithLoading(saveProduct);
runWithLoading(sendOrder);
runWithLoading(updateCustomer);



