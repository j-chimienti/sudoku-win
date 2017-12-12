import React, {Component} from 'react';


import './App.css';

import {Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Button} from 'react-bootstrap';


const grid_1 = '003020600900305001001806400008102900700000008006708200002609500800203009005010300';

const grid_2 = `400000805030000000000700000020000060000080400000010000000603070500200000104000000`;

const grids = [grid_1, grid_2];

const cols = '132456789'.split('');

const digits = cols;


const rows = 'ABCDEFGHI'.split('');

const letters = rows;

const square = [];

rows.forEach(row => {

    cols.forEach(col => {
        square.push(row + col);
    })
});


export default class App extends Component {

    state = {
        values: grid_1,//'.'.repeat(81).split('')
    };

    constructor(props) {

        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let {values} = this.state;


        const values_ = values.replace(/\n/g, '');

        const _values_ = values_.replace(/[^0-9]/g, '0');


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


            this.setState({
                values: Object.values(result),
            })

        }).catch(err => {
            alert(err.message);
        })
    }

    clearGrid() {

        this.setState({
            values: ''.repeat(81)
        })
    }

    render() {

        const rows = [];

        const {values} = this.state;


        for (let i = 0; i <= 81 - 9; i += 9) {


            if (i in [27, 27 * 2]) {

                // rows.push(<Row>{'-'.repeat(100)}</Row>)
            }


            const row = (

                <div key={i} className={'row-flex'}>

                    <input
                        className={'form-control cell'}
                        value={values[i]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i]: e.target.value,
                            }
                        })}/>
                    <input
                        className={'form-control cell'}
                        value={values[i + 1]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i + 1]: e.target.value,
                            }
                        })}/>
                    <input
                        className={'form-control cell'}
                        value={values[i + 2]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i + 2]: e.target.value,
                            }
                        })}/>
                    {' | '}
                    <input
                        className={'form-control cell'}
                        value={values[i + 3]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i + 3]: e.target.value,
                            }
                        })}/>

                    <input
                        className={'form-control cell'}
                        value={values[i + 4]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i + 4]: e.target.value,
                            }
                        })}/>
                    <input
                        className={'form-control cell'}
                        value={values[i + 5]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i + 5]: e.target.value,
                            }
                        })}/>
                    {' | '}
                    <input
                        className={'form-control cell'}
                        value={values[i + 6]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i + 6]: e.target.value,
                            }
                        })}/>
                    <input
                        className={'form-control cell'}
                        value={values[i + 7]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i + 7]: e.target.value,
                            }
                        })}/>
                    <input
                        className={'form-control cell'}
                        value={values[i + 8]}
                        onChange={e => this.setState({
                            values: {
                                ...values,
                                [i + 8]: e.target.value,
                            }
                        })}/>
                </div>
            );


            rows.push(row);

        }

        return (

            <Grid>
                <Row>
                    <Col sm={3}>
                        {grids.map((grid, idx) =>
                            <Button key={grid} onClick={() => {
                                this.setState({
                                    values: grid,
                                })

                            }
                            }>
                                {`grid ${idx}`}
                            </Button>
                        )}
                    </Col>
                    <Col sm={9}>
                        <form
                            onSubmit={this.handleSubmit}
                        >
                            <Grid>
                                {rows}
                            </Grid>
                            <Button type={'reset'}>

                                Reset
                            </Button>
                            <Button
                                bsStyle={'primary'}
                                type={'submit'}>
                                Submit
                            </Button>


                        </form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}