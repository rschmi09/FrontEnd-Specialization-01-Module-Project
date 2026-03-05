// src/components/OrderDetails.tsx

// show products inside of an order

import type { Order } from '../types/types';

type Props = {
    order: Order
}

const OrderDetails = ({ order }: Props) => {

    return (
        <div>

            <h3>OrderDetails</h3>

            {order.products.map((p) => (
                <div key={p.id}>

                    <p>{p.title}</p>
                    <p>Qty: {p.count ?? 0}</p>
                    <p>${p.price}</p>

                </div>
            ))}

            <p><strong>Total:</strong>${order.totalPrice}</p>

        </div>
    );
};

export default OrderDetails;