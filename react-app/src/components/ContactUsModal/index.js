import React from "react";
import { useModal } from "../../context/Modal";

function ContactUsModal() {
    const { closeModal } = useModal();


    return (
        <div className="modal-whole">
            <div className="modal-header">
                <div className="modal-exit"
                    onClick={() => closeModal()
                    }>X
                </div>
                <div className="modal-title">Contact Us!</div>
            </div>
            <div className="buddy-info-container">
                <div className="buddy-into-top-container">

                    <div className="buddy-info-field">
                        Alex Travis:

                    </div>
                    <div className="buddy-info-field">
                        Bryan Sang Heon Lee:

                    </div>
                </div>
                <div className="buddy-into-bottom-container">

                    <div className="buddy-info-field">
                        P. Dexter Assaf:

                    </div>
                    <div className="buddy-info-field">
                        Philip Lee:

                    </div>
                </div>


            </div>
        </div>
    )

}




export default ContactUsModal;