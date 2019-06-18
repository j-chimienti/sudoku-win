import React, {Component} from 'react';

import {Board} from "./Board";
import './App.css';


import {easy, grid_1, grid_2, hardest, top_95} from "./grids";
import {BoardSelector} from "./BoardSelector";

const rows = 'ABCDEFGHI'.split('');

const square = [];

const cols = '132456789'.split('');

rows.forEach(row => {

    cols.forEach(col => {
        square.push(row + col);
    })
});

const httpPost = (url, data, callback, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    //request.setRequestHeader('Access-Control-Allow-Origin', '*')
    // request.setRequestHeader('')
    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onload = () => callback(request);
    request.onerror = () => err(request);
    request.send();
};





export default class App extends Component {

    state = {
        values: grid_1,
        time: null,
        loading: false,
        submittedValues: null,
        invoice: null,
        showInvoice: false,

    };

    constructor(props) {

        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
        this.handleUpdateCellValue = this.handleUpdateCellValue.bind(this);
        this.handleNewBoard = this.handleNewBoard.bind(this);
    }

    reset() {

        this.setState({
            values: "0".repeat(81),
            time: null,
            submittedValues: null,
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        let {values} = this.state;


        const values_ = values.replace(/\n/g, '');

        const _values_ = values_.replace(/[^0-9]/g, '0');


        this.setState({loading: true, values: _values_}, async () => {

            fetch('/solve', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    grid: _values_
                })
            }).then(response => {
                return response.json();
            }).then(result => {

                const [time, solved, digits] = result;

                if (!solved) {

                    throw new Error('could not solve');
                }

                this.setState({
                    time,
                    submittedValues: values,
                    values: Object.values(digits).toString().replace(/\,/g, ""),
                    loading: false,
                })

            }).catch(err => {
                alert(err.message);

                this.setState({
                    loading: false,
                    values: grid_1,
                })
            })


        });


    }
    async solveBoard(values) {


        httpPost('/solve', null, result => {

            const r = result;

            console.log(result)
            window.result = result;

            if (result.responseText.match(/^lnbc/)) {

                // fixme: need to post invoice again after payment
                // need to save token

                this.setState({
                    invoice: result,
                    showInvoice: true
                })

            }
        }, err => {
            console.log(err);

            var j = err;
            return j;
        })

    }

    clearGrid() {

        this.setState({
            values: ''.repeat(81),
            submittedValues: null,
        })
    }

    handleUpdateCellValue(e, i) {

        e.preventDefault()

        const {values} = this.state;

        this.setState({
            values: values.substr(0, i) + e.target.value + values.substr(i + 1)
        })
    }

    handleNewBoard(values) {

        this.setState({
            values,
            time: null,
            submittedValues: null,
            collapse: {
                easy: false,
                top_95: false,
                hard: false,
            }

        })
    }




    render() {


        const {time, loading} = this.state;


        return (

                <div className={'app'}>
                    <div className={"navbar navbar-dark bg-primary mb-3"}>
                            <div className={'container'}>
                                <h1 className={'navbar-brand text-uppercase'}>Sudoku Solver</h1>
                            </div>
                    </div>
                    <div className={'container'} style={{height: "80vh", minHeight: "400px" }}>
                        <form
                            onSubmit={this.handleSubmit}

                        >

                            <div className={'row'}>

                                <div className={'col-sm-3'}>
                                    <div className={'row'} style={{maxHeight: '30rem', overFlowY: "scroll"}}>
                                        <BoardSelector
                                            handleNewBoard={this.handleNewBoard}
                                        />


                                    </div>

                                    <div className={"row"}>
                                        <button
                                            className={'btn btn-secondary'}
                                            onClick={this.reset}
                                        >
                                            <i className={'fa fa-refresh'}></i>
                                            {' Reset'}
                                        </button>

                                        <button
                                            disabled={!!time}
                                            className={'btn btn-primary'}
                                            onClick={this.handleSubmit}

                                        >
                                            <i className={'fa fa-pencil mr-2'}></i>
                                            {'Solve'}
                                        </button>

                                    </div>

                                    <div className={'row display_text'}>
                                        {time &&
                                        <span><b>Solved in </b>{time.toFixed(3)} seconds</span>


                                        }
                                        {loading && <span>
                                    <i className={'fa fa-refresh fa-spin'}>

                                    </i>
                                </span>}
                                    </div>
                                </div>

                                <div className={'col-sm-9'}>
                                    <div className={'row center'}>
                                        <Board
                                            {...this.state}
                                            handleUpdateCellValue={this.handleUpdateCellValue}

                                        />
                                    </div>
                                </div>

                            </div>

                        </form>
                    </div>
                <footer

                    className={'bg-secondary'}
                    style={{height: "20vh", minHeight: "200px"}}

                >
                    <h2>
                        {'Thanks to '}
                        <a href={'https://github.com/norvig/pytudes'}>Peter Norvig</a>
                    </h2>
                </footer>

            </div>
        )
    }
}
