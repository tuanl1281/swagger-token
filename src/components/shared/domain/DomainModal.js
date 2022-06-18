import React, { useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSwagger } from 'hooks';
import { createDomain, updateDomain } from 'actions/domain';

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

const DomainModal = ({ open, data, onClose }) => {
  const { errors, reset, watch, register, setValue, handleSubmit } = useForm();

  const { getDomain } = useSwagger();
  const dispatch = useDispatch();
  const onSubmit = (d) => {
    dispatch(
      data?.id
      ? updateDomain({
        ...d,
        id: data?.id,
        tokenList: data?.tokenList ?? [],
      })
      : createDomain({
        ...d,
        id: uuidv4(),
        tokenList: [],
      }),
    );
    onClose();
  };

  useEffect(() => {
    register('name', { required: true });
  }, [register]);

  useEffect(() => {
    const someThingNeedToRun = async () => {
      if (data?.id) {
        reset(data);
      } else {
        const domain = await getDomain();
        reset({
          name: domain,
        });
      }
    };

    someThingNeedToRun();
  }, [reset, getDomain, data]);

  return (
    <Wrapper open={open || Boolean(data?.id)}>
      <Form>
        <Field>
          <Input
            placeholder="Enter domain's name"
            value={watch('name')}
            onChange={(event) => setValue('name', event?.target?.value ?? '')}
          />
          {errors?.name && <Feedback>{errors.name?.message ? errors.name.message : 'Bắt buộc'}</Feedback>}
        </Field>
        <Field>
          <Button onClick={() => handleSubmit(onSubmit)()}>Submit</Button>
        </Field>
      </Form>
    </Wrapper>
  );
};

export default DomainModal;
