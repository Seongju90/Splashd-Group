import React from "react";
import { useModal } from "../../context/Modal";
import gitcon from '../../assets/gitcon.png'
import linkcon from '../../assets/linkcon.png'
import '../../zCSS/about.css'

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

                        <div className="abouttitle one">
                            Current Contributors:
                        </div>
                        <div className="currentbox">
                            <div className='personcard'>
                                P. Dexter Assaf:
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
                            {/* <div className='personcard'>
                                Alex Travis:
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


                            </div> */}
                        </div>
                    </div>
                    <div className="abouttitle two">
                        Past Contributors:
                        <div className="buddy-info-field-bryan">
                            <div className='personcard'>
                                Alex Travis:
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
                            <div className='personcard'>
                                Bryan Sang Heon Lee:
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
                            <div className='personcard'>
                                Philip Lee:
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
