import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      padding: 0
    },
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(0),
	//   marginTop: 0,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    textfiled: {
      color: 'black',
    },
	dicomWrapper: {
		width: '100%',
		height: `calc(100% - 260px)`,
	},
    dicom: {
      width: '100%',
      height: '100%',
      marginTop: 164,
      marginLeft: 72,
      margin: 'auto',
    },
	ele: {
		width: '100%',
		height: '100%',
	},
	appbar: {
		display: 'flex',
		paddingLeft: 72,
		paddingBottom: 10,
		marginTop: 64,
		backgroundColor: 'white',
	},
	popover: {
		pointerEvents: 'none',
	},
	papers: {
		padding: theme.spacing(1),
	},
  })
);

export default useStyles;