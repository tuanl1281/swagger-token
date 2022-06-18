import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import ConfirmModal from 'components/shared/ConfirmModal';
import TokenModal from 'components/shared/token/TokenModal';

import { useSwagger } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteToken, deleteToken } from 'actions/token';

const Wrapper = styled.div`
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
    background-color: ${(props) => props?.active ? '#2a2a33' : '#41414c'};
  }

  &:hover {
    &:before {
      background-color: ${(props) => props?.active ? '#41414c' : '#2a2a33'};
    }
  }
`;

// #region List
const List = styled.div`
  overflow: hidden;
`;

const ListItem = styled.div`
  display: flex;
  overflow: hidden;
  padding: 1em 0.57em 1em 1em;
  background-color: #41414c;
  color: white;
  border-bottom: 1px solid #2a2a33;

  &:last-child {
    border-bottom: 0 !important;
  }
`;

const ListItemLabel = styled.span`
`;

const ListItemLabelSub = styled.span`
  display: block;
  font-style: italic;
  font-size: 10px;
`;

const ListItemLabelTool = styled.div`
  margin-left: auto;
  padding-top: 0.35em;
`;
// #endregion

const TokenTable = () => {
  const [confirm, setConfirm] = useState();

  const [openCreate, setOpenCreate] = useState(false);
  const [updateDetails, setUpdateDetails] = useState(undefined);

  const { setToken } = useSwagger();
  const dispatch = useDispatch();
  const { selectedDomain: domain, domainList } = useSelector((state) => state.domain);

  // eslint-disable-next-line
  const selectedDomain = useMemo(() => domainList.find((d) => d.id === domain?.id), [domainList]);

  return (
    <>
      <Wrapper>
        <List>
          {(selectedDomain?.tokenList ?? []).map((t) => (
            <ListItem key={t?.id}>
              <ListItemLabel>
                {t?.name}
                <ListItemLabelSub>
                  Last updated:
                  {' '}
                  {t?.dateUpdated}
                </ListItemLabelSub>
              </ListItemLabel>
              <ListItemLabelTool>
                <HeaderIcon active={t?.isFavorite} content="ࠏ" onClick={() => dispatch(setFavoriteToken(t, selectedDomain?.id))} />
                <HeaderIcon content="★" onClick={() => setToken(t?.value)} />
                <HeaderIcon content="✎" onClick={() => setUpdateDetails(t, selectedDomain?.id)} />
                <HeaderIcon content="✕" onClick={() => setConfirm(t)} />
              </ListItemLabelTool>
            </ListItem>
          ))}
        </List>
      </Wrapper>

      <ConfirmModal
        open={confirm}
        onCallback={(d) => dispatch(deleteToken(d, selectedDomain?.id))}
        onClose={() => setConfirm(undefined)}
      />

      <TokenModal
        open={openCreate}
        data={updateDetails}
        onClose={() => {
          setOpenCreate(false);
          setUpdateDetails(undefined);
        }}
      />
    </>
  );
};

export default TokenTable;
