import moveSlice from './moveSlice'

const onKeyPressed = ({ sliceInfo, e }) => {
  const keyCode = e.keyCode
  const key = e.key
  if (keyCode == 38) {
    console.log(key == 'ArrowUp')
    moveSlice({ ...sliceInfo, type: 0, direction: 1 })
  } else if (keyCode == 40) {
    console.log(key == 'ArrowDown')
    moveSlice({ ...sliceInfo, type: 0, direction: -1 })
  } else if (keyCode == 37) {
    console.log(key == 'ArrowLeft')
    moveSlice({ ...sliceInfo, type: 1, direction: 1 })
  } else if (keyCode == 39) {
    console.log(key == 'ArrowRight')
    moveSlice({ ...sliceInfo, type: 1, direction: -1 })
  }
}

export default onKeyPressed
