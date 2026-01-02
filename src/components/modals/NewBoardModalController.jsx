import { useState } from "react";
import NewBoardModal from "../NewBoardModal";

export default function NewBoardModalController({ onCreate, children }) {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
        <>
        {open && (
            <NewBoardModal
            open={open}
            onClose={closeModal}
            onCreate={(data) => {
                onCreate(data);
                closeModal();
            }}
            />
        )}

        {typeof children === "function" ? children({ openNewBoard: openModal }) : null}
        </>
    );
}