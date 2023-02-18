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
                            <a href='https://github.com/ajtravis'>Alex Travis</a>
                        </div>
                        <div className="buddy-info-field-bryan">
                            <a href='https://github.com/brylee8295'>Bryan Sang Heon Lee</a>
                        </div>
                    </div>
                    <div className="buddy-into-bottom-container">
                        <div className="buddy-info-field-dex">
                            P. Dexter Assaf:
                        </div>
                        <div className="buddy-info-field-philip">
                            <a href='https://github.com/Seongju90'>Philip Lee</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}




export default ContactUsModal;
