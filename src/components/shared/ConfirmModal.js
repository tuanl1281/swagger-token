import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${(props) => props?.open ? 'block' : 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #1c1b21;
`;

const Form = styled.div`
  padding: 0.5em;
`;

const Field = styled.div`
  width: 100%;
  margin-bottom: 0.25em;
`;

const Button = styled.button`
  width: 100%;
  color: white;
  padding: 0.5em 0.75em;
  background-color: #2a2a33;
  border: 1px solid rgba(34, 36, 38, .15);
  border-radius: .25rem;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
  transition: color .1s ease,border-color .1s ease;

  &:hover {
    background-color: #42414d;
  }
`;

const ConfirmModal = ({ open, onCallback, onClose }) => {
  const callback = (d) => {
    onCallback(d);
    onClose();
  };

  return (
    <Wrapper open={Boolean(open)}>
      <Form>
        <Field>
          <Button onClick={() => callback(open)}>Confirm</Button>
        </Field>
        <Field>
          <Button onClick={() => onClose()}>Cancel</Button>
        </Field>
      </Form>
    </Wrapper>
  );
};

export default ConfirmModal;
