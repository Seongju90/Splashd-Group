import React from "react";
import { useModal } from "../../context/Modal";

function ContactUsModal() {
    const { closeModal } = useModal();


    return (
        <div className='contact-us'>

            <div className="modal-whole">
                <div className="modal-header">
                    <div className="modal-title">Contact Us!</div>
                    <div className="modal-exit"
                        onClick={() => closeModal()
                        }>X
                    </div>
                </div>
                <div className="buddy-info-container">
                    <div className="buddy-into-top-container">

                        <div className="buddy-info-field-alex">
                            Alex Travis:

                        </div>
                        <div className="buddy-info-field-bryan">
                            Bryan Sang Heon Lee:

                        </div>
                    </div>
                    <div className="buddy-into-bottom-container">

                        <div className="buddy-info-field-dex">
                            P. Dexter Assaf:

                        </div>
                        <div className="buddy-info-field-philip">
                            Philip Lee:

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )

}




export default ContactUsModal;