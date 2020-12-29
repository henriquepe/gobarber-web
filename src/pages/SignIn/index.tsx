/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';

import { useAuth } from '../../hooks/AuthContext';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        // disparar toast

        // o formato do set errors é exatamente igual o do abaixo: a propriedade e depois o erro.

        /* Set all errors
formRef.current.setErrors({
  name: 'Name is required',
  address: {
    street: 'Street not found',
  },
}); */
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input icon={FiMail} placeholder="E-mail" type="text" name="email" />
          <Input
            icon={FiLock}
            type="password"
            name="password"
            placeholder="Senha"
          />
          <Button name="sigin" type="submit">
            Entrar
          </Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="create account">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;