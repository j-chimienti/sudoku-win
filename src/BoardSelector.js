import React from 'react';
import PropTypes from 'prop-types';
import {easy, hardest, top_95} from "./grids";


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

                <h3>Puzzles</h3>
                <button className={'btn'} onClick={e => {
                    e.preventDefault()
                    this.updateVisible('easy')
                }}>Easy</button>
                <div>
                    {visible === 'easy' && easy.map((eas, idx) =>
                        <button className={'btn'}
                                key={eas + idx}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNewBoard(eas)
                                }}
                        >
                            {idx + 1}
                        </button>
                    )}
                </div>

                <button className={'btn'} onClick={e => {
                    e.preventDefault()
                    this.updateVisible('hard')
                }}>Hard</button>
                <div>
                    {visible === 'hard' && hardest.map((eas, idx) =>
                        <button className={'btn'}
                                key={eas + idx}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNewBoard(eas)
                                }}
                        >
                            {idx + 1}
                        </button>
                    )}
                </div>

                <button className={'btn'} onClick={e => {
                    e.preventDefault()
                    this.updateVisible('top_95')
                }}>Top 95</button>
                <div>
                    {visible === 'top_95' && top_95.map((eas, idx) =>
                        <button className={'btn'}
                                key={eas + idx}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNewBoard(eas)
                                }}
                        >
                            {idx + 1}
                        </button>
                    )}
                </div>
            </div>
        )
    }
}



BoardSelector.propTypes = {};
BoardSelector.defaultProps = {};

export default BoardSelector;
