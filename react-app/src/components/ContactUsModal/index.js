import React from "react";
import { useModal } from "../../context/Modal";
import gitcon from '../../assets/gitcon.png'
import linkcon from '../../assets/linkcon.png'

function ContactUsModal() {
    const { closeModal } = useModal();

    //IF ANY OF YOU SEE THIS!!!!!!!!!!!!!!
    //I had to update a ton of css and various other things, this is just the contact us page.
    // If you contribute again, feel free to shift your name and link divs up to current contributors
    // Unfortunately, since we can't see, to find cohesion, I am gonna take this across what i consider the finish line
    //it would be a ton faster with help!!!!
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
                            Current Contributors:
                        </div>
                        <div className="buddy-info-field-dex">
                            P. Dexter Assaf:
                            <div>
                                <div className="gitcon" onClick={() => window.open('https://github.com/D0RK5TER', '_blank')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={gitcon}
                                        className="gitcon"
                                        style={{ float: 'left' }}
                                        alt='my buttons'
                                    />
                                </div>

                                <div className="linkcon" style={{ cursor: 'pointer' }} onClick={() => window.open('https://www.linkedin.com/in/p-dexter-assaf-63a7a3252/', '_blank')}>
                                    <img src={linkcon}
                                        alt='my buttons'
                                    />
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="buddy-into-bottom-container">
                        <div className="buddy-info-field-alex">
                            Past Contributors:
                        </div>
                        <div className="buddy-info-field-bryan">
                            Alex Travis:
                            <div>
                                <div className="gitcon" onClick={() => window.open('https://github.com/ajtravis', '_blank')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={gitcon}
                                        className="gitcon"
                                        style={{ float: 'left' }}
                                        alt='my buttons'
                                    />
                                </div>

                                <div className="linkcon" style={{ cursor: 'pointer' }} onClick={() => window.open('https://www.linkedin.com/in/ajtravis93/', '_blank')}>
                                    <img src={linkcon}
                                        alt='my buttons'
                                    />
                                </div>


                            </div>
                            Bryan Sang Heon Lee:
                            <div>
                                <div className="gitcon" onClick={() => window.open('https://github.com/brylee8295', '_blank')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={gitcon}
                                        className="gitcon"
                                        style={{ float: 'left' }}
                                        alt='my buttons'
                                    />
                                </div>

                                <div className="linkcon" style={{ cursor: 'pointer' }} onClick={() => window.open('https://www.linkedin.com/in/bryan-sang-heon-lee-a61279119/', '_blank')}>
                                    <img src={linkcon}
                                        alt='my buttons'
                                    />
                                </div>


                            </div>
                            Philip Lee:
                            <div>
                                <div className="gitcon" onClick={() => window.open('https://github.com/Seongju90', '_blank')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={gitcon}
                                        className="gitcon"
                                        style={{ float: 'left' }}
                                        alt='my buttons'
                                    />
                                </div>

                                <div className="linkcon" style={{ cursor: 'pointer' }} onClick={() => window.open('https://www.linkedin.com/in/p-dexter-assaf-63a7a3252/', '_blank')}>
                                    <img src={linkcon}
                                        alt='my buttons'
                                    />
                                </div>


                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}




export default ContactUsModal;
