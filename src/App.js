import React, {Component} from 'react';

import {Board} from "./Board";
import './App.css';

import {Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Button, Collapse, Well} from 'react-bootstrap';

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


export default class App extends Component {

    state = {
        values: grid_1,
        time: null,
        collapse: {
            easy: false,
            top_95: false,
            hard: false,
        },
        loading: false,
        submittedValues: null,

    };

    constructor(props) {

        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
        this.handleUpdateCellValue = this.handleUpdateCellValue.bind(this);
        this.handleNewBoard = this.handleNewBoard.bind(this);
        this.handleUpdateCollapse = this.handleUpdateCollapse.bind(this);
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


        this.setState({loading: true, values: _values_});


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
    }

    clearGrid() {

        this.setState({
            values: ''.repeat(81),
            submittedValues: null,
        })
    }

    handleUpdateCellValue(e, i) {

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

    handleUpdateCollapse(type) {

        return this.setState({
            collapse:
                {
                    ...this.state.collapse,
                    [type]: !this.state.collapse.type
                }
        })
    }


    render() {


        const {time, collapse, loading} = this.state;


        return (

            <div>
                <form
                    onSubmit={this.handleSubmit}
                    className={'app'}
                >

                    <Grid>

                        <Row>
                            <BoardSelector
                                collapse={collapse}
                                handleUpdateCollapse={this.handleUpdateCollapse}
                                handleNewBoard={this.handleNewBoard}
                            />


                        </Row>
                        <Row className={'row_flex center'}>
                            <Board
                                {...this.state}
                                handleUpdateCellValue={this.handleUpdateCellValue}

                            />
                        </Row>
                    </Grid>


                </form>
                <footer>
                    <Row className={"row_flex center"}>
                        <Button
                            onClick={this.reset}
                        >
                            <i className={'fa fa-refresh'}></i>
                            {' Reset'}
                        </Button>

                        <Button
                            bsSize={'large'}
                            disabled={!!time}
                            bsStyle={'primary'}
                            onClick={this.handleSubmit}

                        >
                            <i className={'fa fa-pencil'}></i>
                            {' Solve'}
                        </Button>

                    </Row>
                    <Row className={'text-center'}>
                        {time && <h4>
                            <b>Solved in </b>{time.toFixed(3)} seconds
                        </h4>

                        }
                        {loading && <span>
                                    <i className={'fa fa-refresh fa-spin'}></i>
                                </span>}
                    </Row>
                </footer>

            </div>
        )
    }
}