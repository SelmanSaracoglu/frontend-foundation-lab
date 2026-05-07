function sayHello() {
  console.log("Hello");
}

sayHello();


function greet(name: string) {
  console.log("Hello " + name);
}

greet("Selman");
greet("Ayşe");

function add(a: number, b: number) {
  return a + b;
}

const result = add(5, 3);

console.log(result);