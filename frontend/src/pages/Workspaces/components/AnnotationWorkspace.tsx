import { Formik, FormikProps } from 'formik';
import { Container } from '@material-ui/core';
import 'pages/Home/index.scss';
import NavigationBar from './NavBarBtn';
import Annotation from './Annotation/Annotation';
import useStyles from './Annotation/Style/Style';

const AnnotationWorkspace = (): JSX.Element => {
  const classes = useStyles();
	
  return (
    <Formik
      initialValues={{
        username: '',
		    email: '',
        password: '',
      }}    
      onSubmit={ () => {} }
    >
    {(
        props: FormikProps<{			
                username: string;
                email: string;
                password: string;			
              }>
      ) => {
        const { } = props;
		
        return (
          	<Container  
              className={classes.container}
              style={{backgroundColor: 'black'}}>

              <NavigationBar/>
              
              <div className={classes.dicomWrapper} id="canvas">
                <Annotation nrrdUrl='http://localhost/api/get-nrrd-volume/admin/liver_01^patient/undefined/'/>
              </div>
            </Container>
        );
      }}
    </Formik>
  );
};

export default AnnotationWorkspace;
