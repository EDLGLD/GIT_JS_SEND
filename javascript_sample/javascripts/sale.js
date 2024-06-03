const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");

const products = {
  1: {"name":"オリジナルブレンド200g","price":500},
  2: {"name":"オリジナルブレンド500g","price":900},
  3: {"name":"スペシャルブレンド200g","price":700},
  4: {"name":"スペシャルブレンド500g","price":1200},
}


let purchases = [];

function add() {
    const productId = parseInt(document.getElementById('product').value);
    const product = products[productId];
    const number = parseInt(numberElement.value);
    let purchase = {
      name: product.name,
      price: product.price,
      number: parseInt(number),
    };
  
    let newPurchase = true; //--1
  
    purchases.forEach(function(item) {  //--2
      if(item.price === purchase.price) {
        newPurchase = false;
      }
    });
  
    if(purchases.length < 1 || newPurchase) { //--3
      purchases.push(purchase);
    } else {
      for(let i = 0; i < purchases.length; i++) {
        if(purchases[i].price === purchase.price) {
          purchases[i].number += purchase.number;
        }
      }
    }
  
    window.alert(`${display()}\n小計${subtotal()}円`);
    priceElement.value = "";
    numberElement.value = "";
  }


function calc() {
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum);

    window.alert(`${display()}\n小計${sum}円、送料は${postage}円、合計は${sum + postage}円です`);
    purchases = [];
    priceElement.value = "";
    numberElement.value = "";
}

function subtotal(){
    return purchases.reduce(function(prev, purchase) {
        return prev + purchase.price * purchase.number;
    }, 0);
}

function display(){
    return purchases.map(function(purchase) {
        return `${purchase.name} ${purchase.price}円:${purchase.number}点`;
    }).join("\n");
}

function calcPostageFromPurchase(sum) {
    if (sum == 0 ||sum >= 3000){
        return 0;
    } else if (sum < 2000){
        return 500;
    } else {
        return 250;
  }
}