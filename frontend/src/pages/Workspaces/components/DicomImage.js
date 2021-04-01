import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles( theme => ({
// 	createStyles({
// 		canvas: {
//             // width: '100%',
//             // height: `calc(100vh - 116px)`,
//             // backroundColor: 'black',
//         },
// 	}),
// }));

function DicomImage() {

    // const classes = useStyles();

	return ( 
		<canvas 
        style={{backgroundColor: 'black', 
                width: '100%', 
                height: `calc(100% - 100px)`

            }}>
            <p>HELOOOOOOOOOOOOOOOOOOOOOO</p>
        </canvas>
	);
}

export default DicomImage;