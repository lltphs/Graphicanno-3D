import { Button } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const SwitchStyleButton = ({ matNVol }) => (
  <Button className="item-btn"
    onClick={() => handleSwitchStyle(matNVol)}>
    <WbSunnyIcon id="zoom-in" className="item-icon" />
    <br />
    Style
  </Button>
);

const handleSwitchStyle = (matNVol) => {
  matNVol.mat.uniforms['u_renderstyle'].value = 1 - matNVol.mat.uniforms['u_renderstyle'].value;
}

export default SwitchStyleButton;