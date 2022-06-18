import React, { useEffect } from 'react';
import styled from 'styled-components';

import DomainTable from 'components/shared/domain/DomainTable';
import { useSwagger } from 'hooks';

const Wrapper = styled.div`
  padding: 0.5em;
`;

const DomainPage = () => {
  const { setFavoriteToken } = useSwagger();

  useEffect(() => {
    setFavoriteToken();
  }, [setFavoriteToken]);

  return (
    <Wrapper>
      <DomainTable />
    </Wrapper>
  );
};

export default DomainPage;
