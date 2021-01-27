import React from 'react';

import Spinner from 'components/common/Spinner/Spinner';

const FallBack = (): JSX.Element => <Spinner size={100} />;

export default React.memo(FallBack);
