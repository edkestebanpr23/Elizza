import React, { useState } from 'react';
import Payment from "../Payment";
import { useMutation } from "@apollo/client";
import { UPDATE_PAYMENT, GET_SALES } from "../../graphql/petitions";
import { showToast } from "../../funtions";

const BtnAddPay = ({ color, iLang, id, remaining, onHowMuchPay }) => {

    // Apollo Mutation
    const [updatePayment] = useMutation(UPDATE_PAYMENT, {
        update(cache, { data: { updatePayment } }) {
            try {
                const { getSales } = cache.readQuery({ query: GET_SALES });
                console.log("1", getSales);
                cache.writeQuery({
                    query: GET_SALES,
                    data: { getSales: getSales.concat([updatePayment]) }
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