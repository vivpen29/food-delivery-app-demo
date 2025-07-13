import {useActionState, useEffect, useRef, useState} from "react";

async function submitDataToServer(formData, orderItems) {

    console.log("Received orderItems in Checkout component: ", orderItems);
    const req = {
        order: {
            items: orderItems,
            customer: {
                name: formData.fullName,
                email: formData.email,
                street: formData.address,
                "postal-code": formData.code,
                city: formData.city,
            }
        }
    }

    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.json();
}

export default function Checkout({dialogRef, cartTotal, orderItems}) {

    const finalDialog = useRef(null);

    const handleDialogClose = (event) => {
        event.preventDefault();
        if (dialogRef.current.hasAttribute("open")) {
            dialogRef.current.close();
        }
    }

    const handleSubmissionAction = async (prevState, formData) => {

        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const address = formData.get("address");
        const code = formData.get("code");
        const city = formData.get("city");

        if (!fullName || !email || !address || !code || !city) {
            return {
                message: "Please fill in all fields",
            };
        }

        try {
            console.log("Received formData in Checkout component: ", {
                fullName: fullName,
                email: email,
                address: address,
                code: code,
                city: city
            });
            const responseData = await submitDataToServer({
                fullName: fullName,
                email: email,
                address: address,
                code: code,
                city: city
            }, orderItems);
            return {
                message: "Order Status: " + responseData.message,
            };
        } catch (error) {
            console.log("Error processing order: ", error.message);
            return {
                message: "Error processing order..." + error.message,
            };
        }
    };

    const [state, formAction] = useActionState(handleSubmissionAction, {
        message: "Processing order..."
    })

    function openFinalDialog() {
        if (finalDialog.current) {
            if (!finalDialog.current.hasAttribute("open")) {
                finalDialog.current.showModal();
            }
        }
    }

    function handleFinalDialogClose() {
        if (finalDialog.current) {
            finalDialog.current.close();
        }
        handleDialogClose();
    }

    useEffect(() => {
        if (state.message !== "Processing order...") {
            openFinalDialog();
        }
    }, [state.message]);

    return (
        <>
            <div className="cart">
                <h2>Checkout</h2>
                <p>Total Amount: ${cartTotal}</p>
                <form action={formAction}>
                    <div>
                            <div className="control">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name="fullName" required/>
                            </div>
                            <div className="control">
                                <label htmlFor="email">E-Mail Address</label>
                                <input type="email" name="email" required/>
                            </div>
                            <div className="control">
                                <label htmlFor="address">Street</label>
                                <input type="text" name="address" required/>
                            </div>
                        <div className="control-row">
                            <div className="control">
                                <label htmlFor="code">Postal Code</label>
                                <input type="number" name="code" required/>
                            </div>
                            <div className="control">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" required/>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="text-button" onClick={handleDialogClose}>Close</button>
                            <button className="button" type="submit">Go to Checkout</button>
                        </div>
                    </div>
                </form>
            </div>

            {<dialog ref={finalDialog} className="modal">
                    <h1 className="center">{state.message}</h1>
                <div className="modal-actions">
                    <button className="button" onClick={handleFinalDialogClose}>Okay!</button>
                </div>
            </dialog>}
        </>
    )
}