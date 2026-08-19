export {};
const order = {
  items: [
    { name: "bla", price: 8 },
    { name: "blabla", price: 200 },
  ],
};

const orderTotal = (order: any) => {
  return order.items.reduce((prev: any, cur: any) => {
    console.log(cur);
    // console.log(cur.price);
    return prev + cur.price;
  }, 0);
};

const result = orderTotal(order);
console.log(result);
