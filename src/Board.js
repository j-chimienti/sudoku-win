import React from 'react';


export function Board({values, time, collapse, submittedValues, handleUpdateCellValue}) {


    const rows = [];


    for (let i = 0; i <= 81 - 9; i += 9) {


        const row = (

            <div key={i} className={'row_flex'} style={{marginLeft: '15vw'}}>

                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i] && submittedValues[i] === '0' ? 'cell active' : 'cell'}
                    value={values[i] === "0" ? '' : values[i]}

                    onChange={e => handleUpdateCellValue(e, i)}/>
                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i + 1] && submittedValues[i + 1] === '0' ? 'cell active' : 'cell'}
                    value={values[i + 1] === "0" ? '' : values[i + 1]}
                    onChange={e => handleUpdateCellValue(e, i + 1)}/>
                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i + 2] && submittedValues[i + 2] === '0' ? 'cell active' : 'cell'}
                    value={values[i + 2] === "0" ? '' : values[i + 2]}
                    onChange={e => handleUpdateCellValue(e, i + 2)}/>
                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i + 3] && submittedValues[i + 3] === '0' ? 'cell active' : 'cell'}
                    value={values[i + 3] === "0" ? '' : values[i + 3]}
                    onChange={e => handleUpdateCellValue(e, i + 3)}/>

                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i + 4] && submittedValues[i + 4] === '0' ? 'cell active' : 'cell'}
                    value={values[i + 4] === "0" ? '' : values[i + 4]}
                    onChange={e => handleUpdateCellValue(e, i + 4)}/>
                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i + 5] && submittedValues[i + 5] === '0' ? 'cell active' : 'cell'}
                    value={values[i + 5] === "0" ? '' : values[i + 5]}
                    onChange={e => handleUpdateCellValue(e, i + 5)}/>
                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i + 6] && submittedValues[i + 6] === '0' ? 'cell active' : 'cell'}
                    value={values[i + 6] === "0" ? '' : values[i + 6]}
                    onChange={e => handleUpdateCellValue(e, i + 6)}/>
                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i + 7] && submittedValues[i + 7] === '0' ? 'cell active' : 'cell'}
                    value={values[i + 7] === "0" ? '' : values[i + 7]}
                    onChange={e => handleUpdateCellValue(e, i + 7)}/>
                <input
                    type={"number"}
                    min={0}
                    max={9}
                    className={submittedValues && submittedValues[i + 8] && submittedValues[i + 8] === '0' ? 'cell active' : 'cell'}
                    value={values[i + 8] === "0" ? '' : values[i + 8]}
                    onChange={e => handleUpdateCellValue(e, i + 8)}/>
            </div>
        );


        rows.push(row);

    }


    return (

        <div>
            {rows}
        </div>

    )
}

