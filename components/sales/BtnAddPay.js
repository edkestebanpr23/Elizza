import React, { useContext } from 'react';
import Payment from "../Payment";
import { useMutation } from "@apollo/client";
import { UPDATE_PAYMENT, GET_SALES } from "../../graphql/petitions";
import { showToast } from "../../funtions";
import SaleContext from "../../context/sale/saleContext";


const BtnAddPay = ({ color, iLang, id, remaining, onHowMuchPay }) => {
    const { payCount } = useContext(SaleContext);

    // Apollo Mutation
    const [updatePayment] = useMutation(UPDATE_PAYMENT, {
        update(cache, { data: { updatePayment } }) {
            try {
                const { getSales } = cache.readQuery({ query: GET_SALES });
                console.log("1", getSales);
                const newSales = getSales.filter(sale => sale.id !== id);
                cache.writeQuery({
                    query: GET_SALES,
                    data: { getSales: newSales.concat([updatePayment]) }
                })
            } catch (error) {
                console.log(error);
            }
        }
    });

    async function addPayment(quantity) {
        const date = new Date();

        const dat = {
            id,
            payment: {
                quantity: parseInt(quantity),
                date: date.toString()
            }
        };
        console.log('Datos a enviar:', dat);

        try {
            const { data } = await updatePayment({
                variables: {
                    id,
                    payment: {
                        quantity: parseInt(quantity),
                        date: date.toString()
                    }
                }
            });

            if (data.updatePayment) {
                showToast(iLang == 0 ? 'Abono añadido' : 'Payment added');
                onHowMuchPay({ quantity, date });
                payCount();
            }

        } catch (error) {
            console.log('Error:', error);
            showToast(iLang == 0 ? 'Error, abono no añadido' : 'Error: Payment not added');
        }
    }



    return (
        <>
            <Payment iLang={iLang} onPaymentAdd={addPayment} />
        </>
    );
}

export default BtnAddPay;