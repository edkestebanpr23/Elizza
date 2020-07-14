const parseToMoney = money => {
    if (money) {
        money = money.toString();
        let aux = "";
        let count = 0;
        for (let i = money.length - 1; i >= 0; i--) {
            count++;
            if (count == 3) {
                aux = '.' + money[i] + aux;
            } else if (count == 6) {
                if (money.length > 6) {
                    aux = "'" + money[i] + aux;
                } else {
                    aux = money[i] + aux;
                }
            } else {
                aux = money[i] + aux;
            }
        }
        return aux;
    } else {
        return money;
    }
};

export default parseToMoney;