import React, { useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createToken, updateToken } from 'actions/token';

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

const Feedback = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  color: #ffffff;
  font-size: 80%;
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

const TokenModal = ({ open, data, onClose }) => {
  const { errors, reset, watch, register, setValue, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const { selectedDomain } = useSelector((state) => state.domain);

  const onSubmit = (d) => {
    dispatch(
      data?.id
      ? updateToken({
        ...d,
        id: data?.id,
        dateUpdated: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
      }, selectedDomain?.id)
      : createToken({
        ...d,
        id: uuidv4(),
        dateUpdated: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
      }, selectedDomain?.id),
    );
    onClose();
  };

  useEffect(() => {
    register('name', { required: true });
    register('value', { required: true });
    register('isFavorite');
  }, [register]);

  useEffect(() => {
    reset(data?.id ? data : { isFavorite: false });
  }, [reset, data]);

  return (
    <Wrapper open={open || Boolean(data?.id)}>
      <Form>
        <Field>
          <Input
            placeholder="Name"
            value={watch('name')}
            onChange={(event) => setValue('name', event?.target?.value ?? '')}
          />
          {errors?.name && <Feedback>{errors.name?.message ? errors.name.message : 'Bắt buộc'}</Feedback>}
        </Field>
        <Field>
          <Input
            placeholder="Value"
            value={watch('value')}
            onChange={(event) => setValue('value', event?.target?.value ?? '')}
          />
          {errors?.value && <Feedback>{errors.value?.message ? errors.value.message : 'Bắt buộc'}</Feedback>}
        </Field>
        <Field>
          <Button onClick={() => handleSubmit(onSubmit)()}>Submit</Button>
        </Field>
      </Form>
    </Wrapper>
  );
};

export default TokenModal;
