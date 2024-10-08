import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Modal from "@/Components/Modal";

export default function CartModal({open}) {
    const [showCart, setShowCart] = useState(open || false);

    const closeModal = () => {
        setShowCart(false);
    };
    return (

        <Modal show={showCart} onClose={closeModal}>
            <form>
                <h1>CART</h1>
            </form>
        </Modal>
    )
}