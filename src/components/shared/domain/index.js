import React from 'react';
import styled from 'styled-components';

import DomainTable from 'components/shared/domain/DomainTable';

const Wrapper = styled.div`
  padding: 0.5em;
`;

const DomainPage = () => (
  <Wrapper>
    <DomainTable />
  </Wrapper>
);

export default DomainPage;
