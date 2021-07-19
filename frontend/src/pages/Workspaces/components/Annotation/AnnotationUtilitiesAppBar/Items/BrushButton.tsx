import { Button } from '@material-ui/core';
import { mdiBrush } from '@mdi/js';
import Icon from '@mdi/react';
import * as cornerstoneTools from 'cornerstone-tools';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useState } from 'react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      width: 300,
      color: 'black',
      // paddingTop: 30,
      marginTop: -10,
      marginLeft: 20,
    },
  })
)

const BrushButton = ({isShow, enableShow, setSize}) : JSX.Element => {
 
  const handleBrush = () => {
    const {getters, configuration} = cornerstoneTools.getModule('segmentation');
    cornerstoneTools.setToolActive('Brush', {mouseButtonMask: 1});
    configuration.radius = 20
  };

  const brush = (event) => {
    handleBrush();
    enableShow(isShow);
  }

  return (
    <div>
      <Button className="item-btn"
              onClick={brush}
              >
        <Icon path={mdiBrush} id="zoom-in" className="item-icon"/>
        <br />
        Brush
      </Button>
    </div>
    
  );
}

export default BrushButton;