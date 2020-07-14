import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from "native-base";
import { main as color } from "../data/colors";
import { saleCustomerCmp as dic } from "../data/languague";
import ListProducts from "../components/ListProducts";
import { parseToMoney, getTotal, getDate } from "../funtions";
import { Line, Separator, BtnAddPay } from "../components";

/**
 * Este componente muestra la compra realizada por un cliente,
 * Aqui se puede ver los abonos en caso de ser una compra a crédito
 */

const SaleCustomer = ({ iLang, sale }) => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(getTotal(sale.products));
    }, []);

    const Payments = sale.credit ? (<PaymentsView payments={sale.payments} iLang={iLang} total={getTotal(sale.products)} />) : (<></>);
    parseToMoney(12000);

    return (
        <>
            <View style={{ marginBottom: 50, marginTop: 20 }}>
                <PaymentText text={dic.totalSale[iLang] + ':'} quantity={total} bold money />
                <PaymentText text={dic.dateSale[iLang] + ':'} value={getDate(sale.register)} bold />
                <PaymentText text={dic.description[iLang]} value={sale.description !== '' ? sale.description : '...'} bold />
                <Separator text={dic.products[iLang]} color={color} />
                <View style={{ marginBottom: 20 }}>
                    <ListProducts products={sale.products} />
                </View>
                {Payments}
            </View>
        </>
    );
};

const PaymentsView = ({ payments, iLang, total }) => {
    let totalPayments = 0;
    return (
        <>
            <Separator text={dic.payments[iLang]} color={color} />
            {
                payments.map(payment => {
                    let date = new Date(payment.date);
                    totalPayments += payment.quantity;
                    return (
                        <PaymentText key={payment.date} date={date} quantity={payment.quantity} money />
                    )
                })
            }
            <Line border={1} color={color.grad[1]} />
            <PaymentText text={dic.totalPayment[iLang] + ':'} quantity={totalPayments} bold money />
            <Line border={1} color={color.grad[5]} />
            <PaymentText text={dic.remaining[iLang] + ':'} quantity={total - totalPayments} bold money />

            <View style={{ paddingHorizontal: 40, marginTop: 30 }}>
                <BtnAddPay color={color} iLang={iLang} />
            </View>
        </>

    );
};

const PaymentText = ({ date, quantity, bold, text, money, value }) => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const dataText = text ? text : date.getDate() + ' / ' + months[date.getMonth()] + ' / ' + date.getFullYear();
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
            <View style={{ flexBasis: '50%' }}>
                <Text style={{ fontSize: 18, color: color.grad[4], fontWeight: bold ? 'bold' : 'normal' }}>
                    {dataText}
                </Text>
            </View>
            <View style={{ flexBasis: '50%' }}>
                {
                    money ?
                        (
                            <Text style={{ fontSize: 18, color: color.grad[7], fontWeight: bold ? 'bold' : 'normal' }}>
                                {parseToMoney(quantity)}
                            </Text>
                        ) : (
                            <Text style={{ fontSize: 18, color: color.grad[7], fontWeight: bold ? 'bold' : 'normal' }}>
                                {quantity} {value}
                            </Text>
                        )
                }
            </View>

        </View>
    );
};

const Finalized = () => {
    return (
        <View>
            <Text>Venta Finalizada</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default SaleCustomer;