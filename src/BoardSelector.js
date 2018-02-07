import React from 'react'
import {easy, hardest, top_95} from "./grids";
import {Button, Collapse, Grid, Row} from "react-bootstrap";


export function BoardSelector({handleNewBoard, collapse, handleUpdateCollapse}) {

    return (

        <Grid>

            <h3>Puzzles</h3>
            <Button onClick={() => handleUpdateCollapse('easy')}>Easy</Button>
            <Collapse in={collapse.easy}>
                <div>
                    {easy.map((eas, idx) =>
                        <Button
                            key={eas + idx}
                            onClick={() => handleNewBoard(eas)}
                        >
                            {idx + 1}
                        </Button>
                    )}
                </div>
            </Collapse>

            <Button onClick={() => handleUpdateCollapse('hard')}>Hard</Button>
            <Collapse in={collapse.hard}>
                <div>
                    {hardest.map((eas, idx) =>
                        <Button
                            key={eas + idx}
                            onClick={() => handleNewBoard(eas)}
                        >
                            {idx + 1}
                        </Button>
                    )}
                </div>
            </Collapse>

            <Button onClick={() => handleUpdateCollapse('top_95')}>Top 95</Button>
            <Collapse in={collapse.top_95}>
                <div>
                    {top_95.map((eas, idx) =>
                        <Button
                            key={eas + idx}
                            onClick={() => handleNewBoard(eas)}
                        >
                            {idx + 1}
                        </Button>
                    )}
                </div>
            </Collapse>

        </Grid>
    )
}