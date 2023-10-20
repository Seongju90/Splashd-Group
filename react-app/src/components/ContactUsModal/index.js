import React from "react";
import { useModal } from "../../context/Modal";

import linkedInIcon from "../../assets/linkedin-svgrepo-com.svg"
import githubIcon from "../../assets/github-com.svg"

function ContactUsModal() {
    const { closeModal } = useModal();

    //IF ANY OF YOU SEE THIS!!!!!!!!!!!!!!
    //I had to update a ton of css and various other things, this is just the contact us page.
    // If you contribute again, feel free to shift your name and link divs up to current contributors
    // Unfortunately, since we can't see, to find cohesion, I am gonna take this across what i consider the finish line
    //it would be a ton faster with help!!!!
    // Alex: used yours as an example cause i figure youll see this
    //just comment in the "personcard"
    return (
        <div className='contact-us'>
            <div className="modal-whole">
                <div className="modal-header" id='headabout'>
                    <div className="modal-title">Contact Us!</div>
                    <div className="modal-exit"
                        onClick={() => closeModal()
                        }>X
                    </div>
                </div>
                <div className="aboutinfo">
                    <div className="buddy-into-top-container">
                        Current Contributors:
                        <div className="buddy-info-field-philip">
                        <a href='https://seongju90.github.io.' target="_blank">Philip Lee</a>
                        <a className="github-icon" href="https://github.com/Seongju90" target="_blank">
                            <img
                                src={githubIcon}
                                alt="github-icon"
                                width="14px"
                                height="14px"
                            />
                        </a>
                        <a classname="linkedin-icon" href="https://www.linkedin.com/in/lee-philip-31902124a/" target="_blank">
                            <img
                                src={linkedInIcon}
                                alt="linkedin-icon"
                                width="14px"
                                height="14px"
                                style={{paddingLeft:'5px'}}
                            />
                        </a>
                        </div>
                    </div>
                    <div className="buddy-into-bottom-container">
                        Past Contributors:
                        <div className="buddy-info-field-dex">
                            <a href='https://github.com/D0RK5TER'>Dexter Assaf</a>
                        </div>
                        <div className="buddy-info-field-alex">
                            <a href='https://github.com/ajtravis'>Alex Travis</a>
                        </div>
                        <div className="buddy-info-field-bryan">
                            <a href='https://github.com/brylee8295'>Bryan Sang Heon Lee</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}




export default ContactUsModal;
