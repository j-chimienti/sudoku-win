import React from 'react';
import PropTypes from 'prop-types';
import {easy, hardest, top_95} from "./grids";

import "./BoardSelector.css"
export class BoardSelector extends React.Component {

    state = {
        visible: null
    }
    constructor(props) {
        super(props);
        this.updateVisible = this.updateVisible.bind(this)
    }

    updateVisible(visible) {

        this.setState({
            visible
        })
    }
    render() {

        const {handleNewBoard} = this.props;
        const {visible} = this.state;

        return (

            <div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="text-dark close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {visible === 'easy' && easy.map((eas, idx) =>
                                    <button className={'btn'}
                                            key={eas + idx}
                                            data-dismiss="modal"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleNewBoard(eas)
                                            }}
                                    >
                                        {idx + 1}
                                    </button>
                                )}

                                {visible === 'hard' && hardest.map((eas, idx) =>
                                    <button className={'btn'}
                                            key={eas + idx}
                                            data-dismiss="modal"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleNewBoard(eas)
                                            }}
                                    >
                                        {idx + 1}
                                    </button>
                                )}

                                {visible === 'top_95' && top_95.map((eas, idx) =>
                                    <button className={'btn'}
                                            key={eas + idx}
                                            data-dismiss="modal"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleNewBoard(eas)
                                            }}
                                    >
                                        {idx + 1}
                                    </button>
                                )}
                            </div>
                            {/*<div className="modal-footer">*/}
                            {/*    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}
                            {/*    <button type="button" className="btn btn-primary">Save changes</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>



                <h3>Puzzles</h3>
                <button className={'btn btn-success btn-select'} data-toggle="modal" data-target="#exampleModal" onClick={e => {
                    e.preventDefault()
                    this.updateVisible('easy')
                }}>Easy</button>
                <div>

                </div>

                <button className={'btn btn-warning btn-select'} data-toggle="modal" data-target="#exampleModal" onClick={e => {
                    e.preventDefault()
                    this.updateVisible('hard')
                }}>Hard</button>
                <div>

                </div>

                <button className={'btn btn-danger btn-select'} data-toggle="modal" data-target="#exampleModal" onClick={e => {
                    e.preventDefault()
                    this.updateVisible('top_95')
                }}>Top 95</button>
                <div>

                </div>
            </div>
        )
    }
}



BoardSelector.propTypes = {};
BoardSelector.defaultProps = {};

export default BoardSelector;
