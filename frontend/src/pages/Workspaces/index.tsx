import { useReducer, useEffect, useCallback, useState } from 'react';
import {
  useHistory,
  Link,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import get from 'lodash/get';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import EmailIcon from '@material-ui/icons/Email';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { logout } from 'store/actions/auth';
import * as UserServices from 'api/user';
import { getDatasetList, uploadDataset, deleteDataset } from 'api/dataset';
import { RootDispatchType } from 'store';

import '../../index.scss';
import { useDropzone } from 'react-dropzone';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import Annotation from './components/Annotation/Annotation'
import InviteModal from './components/InviteModal'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
    },
    dropzone: {
      width: '100%',
      height: 250,
    },
  })
);

interface UserDetailActionTypes {
  type: string;
  payload: string;
}

const initialUserDetail = {
  username: '',
  email: '',
};

function userDetailReducer(
  state = initialUserDetail,
  action: UserDetailActionTypes
) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USERNAME': {
      return {
        ...state,
        username: payload,
      };
    }
    case 'SET_EMAIL': {
      return {
        ...state,
        email: payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

interface PropsDicomDropZone {
  // imgId: string;
  getImageId: Function;
}

const DICOMDropZone = (props: PropsDicomDropZone): JSX.Element => {
  // This part is for dropzone
  const onDrop = useCallback(async (acceptedFiles: Array<File>) => {
    if ((await uploadDataset(acceptedFiles)).status == 200) location.reload();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  let element: HTMLDivElement;

  return (
    <div {...getRootProps()} style={{ width: '100%', height: '100%' }}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop here babe</p> : <p>Drag file here</p>}

      <div
        id="dicom"
        style={{ width: '100%', height: '100%' }}
        ref={(input) => {
          if (input !== null) {
            element = input;

            cornerstone.enable(element);
          }
        }}
      />
    </div>
  );
};

interface PropsLabelContent {
  url: string;
}

const LabelContent = (props: PropsLabelContent): JSX.Element => {
  const { url } = props;
  const history = useHistory();
  const [datasetList, setDatasetList] = useState([]);
  const [imageId, setImageId] = useState('');
  const [selectedId, setSelectedId] = useState('')

  const dispatch: RootDispatchType = useDispatch();

  const [userDetailState, userDetailDispatch] = useReducer(
    userDetailReducer,
    initialUserDetail
  );

  const loadDataset = async () => {
      try {
        const response = await getDatasetList();
        const data = get(response, 'data.data', []);
        setDatasetList(data);
      } catch (error) {
        toast.error("Can't load dataset!", {
          position: 'bottom-left',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        throw error;
      }
    };

  useEffect(() => {
    const loadUserDetail = async () => {
      try {
        const response = await UserServices.getUserDetail();
        userDetailDispatch({
          type: 'SET_USERNAME',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          payload: response.data.username,
        });
        userDetailDispatch({
          type: 'SET_EMAIL',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          payload: response.data.email,
        });
      } catch (error) {
        toast.error("Can't load User data!", {
          position: 'bottom-left',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        throw error;
      }
    };
    loadUserDetail();

    loadDataset();
  }, []);
  
  const onRemoveClick = async (id) => {
    if(confirm('Are you sure want to delete this dataset?')) {
      await deleteDataset(id);
      loadDataset();
    }
  }

  return (
    <div>
      {selectedId && <InviteModal id={selectedId} onClose={() => setSelectedId('')} />}
      <Box p={0} borderRadius="none" color="black">
        <Header
          username={userDetailState.username}
          logout={() => {
            dispatch(logout());
          }}
          changePasswordHandle={() => {
            history.push('/change_password');
          }}
          workspacesHandle={() => {
            history.push('/workspaces');
          }}
        />
      </Box>
      <Box className="workspace-landing">
        <Box className="dataset-item">
          <BurstModeIcon className="data-item" />
          <div className="item-bottom" style={{ marginRight: 30 }}>
            <DICOMDropZone getImageId={(value) => setImageId(value)} />
            <br />
            <Link to={`${url}/labeling/${imageId}`}>
              <Button
                className="overview btn labeling-btn"
                type="submit"
                color="primary"
              >
                <OpenInNewIcon />
                Label
              </Button>
            </Link>
          </div>
        </Box>

        {datasetList.map((dataset) => (
          <Box className="dataset-item" key={dataset.id}>
            <BurstModeIcon className="data-item" />
            <div className="item-bottom">
              <p className="data-detail title">Patient: {dataset.patient_name}</p>
              <p className="data-detail id">ID: {dataset.id}</p>
              <p className="data-detail total">Role: {dataset.role}</p>

              <Link to={`${url}/labeling/${dataset.id}`}>
                <Button
                  className="overview btn labeling-btn"
                  color="primary"
                >
                  <OpenInNewIcon />
                  Label
                </Button>
              </Link>

                            
              {(dataset.role === 'owner') && 
              <Button
                className="overview btn overview-btn"
                color="primary"
                onClick={() => setSelectedId(dataset.id)}
              >
                <EmailIcon />
                Invite
              </Button>}

              <Button
                className="overview btn remove-btn"
                color="secondary"
                onClick={() => onRemoveClick(dataset.id)}
              >
                <DeleteForeverIcon />
                Remove
              </Button>
            </div>
          </Box>
        ))}
      </Box>
    </div>
  );
};

const WorkspacesLayout = (): JSX.Element => {
  const { path, url } = useRouteMatch();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DAT 2 | Workspaces</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyItems="space-between"
      >
        <Box flexGrow={0} />
        <Switch>
          <Route exact path={'/workspaces/labeling/:datasetId'}>
						<Annotation />
					</Route>
					<Route path="*">
						<LabelContent url={url} />
					</Route>
        </Switch>

        <Box p={0}>
          <Footer />
        </Box>
      </Box>
    </div>
  );
};

export default WorkspacesLayout;