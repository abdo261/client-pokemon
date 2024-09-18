export const checkIfSelected = (id,selectedProducts=[])=>{
return selectedProducts.includes(id)
}


export const formatMoney = (amounth) =>{
    return  new Intl.NumberFormat("fr-MA", {
     style: "currency",
     currency: "MAD",
   }).format(amounth);
 }