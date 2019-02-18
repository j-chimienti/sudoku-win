import React from 'react';
import PropTypes from 'prop-types';
import QrCode from "./QrCode";

function InvoiceModal({isOpen, payreq, handleClose}) {
    return (
        <div>
            <Modal
                isOpen={isOpen}
                contentLabel="Pay with Lightning"
            >
                <div className={'mx-auto'} style={{maxWidth: '400px'}}>
                    <div className={'row d-flex justify-content-between align-items-center'}>
                        <h5>Pay with Lightning</h5>
                        <button onClick={handleClose} className={'d-block ml-auto btn btn-sm my-4'}>
                            <i className={'fa fa-close'}>

                            </i>
                        </button>
                    </div>
                    <div className="input-group">
                        <input className="form-control" type="text" value={payreq}/>
                        <div className="input-group-append">
                            <a className="btn btn-warning"
                               href={`lightning:${payreq}`}>
                                <span role={'img'}>⚡</span>
                            </a>
                        </div>
                    </div>
                    <QrCode payreq={payreq}/>

                    <div className={'form-group'}>
                        <label>Node</label>
                        <textarea
                            rows={5}
                            className={'form-control'}
                            readOnly="readOnly"
                            value={'03902356d26efdc0812726c31a1a2e0d721f26063dd252ac89ded8280037e9ece8:198.58.99.169:9735'}
                        >

                            </textarea>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

InvoiceModal.propTypes = {};
InvoiceModal.defaultProps = {};

export default InvoiceModal;

