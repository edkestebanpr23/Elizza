const getTotal = (dataProducts) => {
    let total = 0;
    if (dataProducts) {
        dataProducts.forEach(product => {
            total = total + parseInt(product.price) * parseInt(product.quantity);
        });
    }

    return total;
};

export default getTotal;