import React, { useState } from 'react';
import styled from 'styled-components';

import ConfirmModal from 'components/shared/ConfirmModal';
import DomainMenu from 'components/shared/domain/DomainMenu';
import DomainModal from 'components/shared/domain/DomainModal';
import TokenTable from 'components/shared/token/TokenTable';
import TokenModal from 'components/shared/token/TokenModal';

import { useDispatch, useSelector } from 'react-redux';
import { selectDomain, deleteDomain } from 'actions/domain';

const Wrapper = styled.div`
  margin-top: 0.5em;
`;

const HeaderIcon = styled.label`
  &:before {
    cursor: pointer;
    padding: 0.35em 1em 0.5em 1em;
    content: "${(props) => props?.content ? props.content : '❯'}";
    font-style: normal;
    text-align: center;
    transition: all .25s;
    border-radius: .25rem;
  }

  &:hover {
    &:before {
      background-color: #42414d;
    }
  }
`;

// #region tab
const Tab = styled.div`
  border-radius: .25rem;
  overflow: hidden;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
`;

const TabItem = styled.div`
  width: 100%;
  color: white;
  overflow: hidden;
`;

const TabItemHeader = styled.label`
  display: flex;
  padding: 1em 0.5em 1em 0.5em;
  background-color: #2a2a33;
  font-weight: bold;
`;

const TabItemHeaderLabel = styled.span`
  margin-left: 5px;
`;

const TabItemHeaderTool = styled.div`
  margin-left: auto;
`;

const TabItemContent = styled.div`
  max-height: ${(props) => props?.active ? '100vh' : '0'};
  background-color: #41414c;
  color: #2a2a33;
  transition: all 0.35s;
`;
// #endregion

const DomainTable = () => {
  const [confirm, setConfirm] = useState();

  const [openCreate, setOpenCreate] = useState(false);
  const [updateDetails, setUpdateDetails] = useState(undefined);

  const [openCreateToken, setOpenCreateToken] = useState(false);

  const dispatch = useDispatch();
  const { selectedDomain, domainList } = useSelector((state) => state.domain);

  return (
    <>
      <DomainMenu onCreate={() => setOpenCreate(true)} />
      <Wrapper>
        <Tab>
          {domainList.map((d) => (
            <TabItem key={d?.id}>
              <TabItemHeader>
                <HeaderIcon onClick={() => dispatch(selectDomain(selectedDomain?.id !== d.id ? d : undefined))} />
                <TabItemHeaderLabel>{d.name}</TabItemHeaderLabel>
                <TabItemHeaderTool>
                  <HeaderIcon
                    content="＋"
                    onClick={() => {
                      dispatch(selectDomain(d));
                      setOpenCreateToken(true);
                    }}
                  />
                  <HeaderIcon content="✎" onClick={() => setUpdateDetails(d)} />
                  <HeaderIcon content="✕" onClick={() => setConfirm(d)} />
                </TabItemHeaderTool>
              </TabItemHeader>
              <TabItemContent active={selectedDomain?.id === d.id}>
                <TokenTable />
              </TabItemContent>
            </TabItem>
          ))}
        </Tab>
      </Wrapper>

      <ConfirmModal
        open={confirm}
        onCallback={(d) => dispatch(deleteDomain(d))}
        onClose={() => setConfirm(undefined)}
      />

      <DomainModal
        open={openCreate}
        data={updateDetails}
        onClose={() => {
          setOpenCreate(false);
          setUpdateDetails(undefined);
        }}
      />

      <TokenModal
        open={openCreateToken}
        onClose={() => {
          setOpenCreateToken(false);
        }}
      />
    </>
  );
};

export default DomainTable;
