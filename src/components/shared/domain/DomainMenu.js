import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  
  > * {
    margin-right: 5px !important;

    &:last-child {
      margin-right: 0 !important;
    }

    & button {
      height: 40.5px !important;
    }
  }

  & .input {
    flex-grow: 1;
  }
`;

const Input = styled.input`
  width: 100%;
  color: white;
  padding: 0.5em 0.75em;
  background-color: #2a2a33;
  border: 1px solid rgba(34, 36, 38, .15);
  border-radius: .25rem;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
  transition: color .1s ease, border-color .1s ease;

  &:hover {
    background-color: #42414d;
  }
`;

const Button = styled.button`
  color: white;
  padding: 0.5em 0.75em;
  background-color: #2a2a33;
  border: 1px solid rgba(34, 36, 38, .15);
  border-radius: .25rem;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
  transition: color .1s ease,border-color .1s ease;

  &:after {
    content: "${(props) => props?.content ? props.content : '＋'}";
    width: 1em;
    height: 1em;
    text-align: center;
    transition: all .35s;
  }

  &:hover {
    background-color: #42414d;
  }
`;

const DomainMenu = ({ onCreate }) => (
  <Wrapper>
    <Input />
    <Button content="🔍" />
    <Button onClick={onCreate} />
  </Wrapper>
);

export default DomainMenu;
