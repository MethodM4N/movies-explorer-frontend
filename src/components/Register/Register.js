import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import headerLogo from '../../images/header-logo.svg'

function Register({ onRegister, loggedIn, history, isLoading, errorMessage }) {

   useEffect(() => {
      if (loggedIn) {
         history.push('/');
      }
   }, [loggedIn]);

   const {
      register,
      getValues,
      formState: { errors, isValid },
      handleSubmit,
      reset,
   } = useForm({
      mode: 'onChange',
   });

   function onSubmit() {
      onRegister(getValues());
      reset({
         isValid: false,
      });
   }
   

   return (
      <form className="register" noValidate={true} onSubmit={handleSubmit(onSubmit)}>
         <Link to="/" className="register__head-link"><img className="header__logo" src={headerLogo} alt="Лого" /></Link>
         <h2 className="register__title">Добро пожаловать!</h2>
         <label className="register__info">Имя</label>
         <input className="register__input" placeholder=""
            {...register('name', {
               required: 'Введите имя',
               minLength: { value: 2, message: 'Минимум 2 символа' },
               pattern: {
               value: /^[A-Za-zА-Яа-я -]+$/,
               message: 'Допустимы только буквы',
               },
            })}></input>
         <span className="register__error-massage">{errors?.name?.message}</span>
         <label className="register__info">E-mail</label>
         <input className="register__input" placeholder=""
         {...register('email', {
            required: 'Введите email',
            pattern: {
            value: /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i,
            message: 'Введите корректный email',
            },
         })}></input>
         <span className="register__error-massage">{errors?.email?.message}</span>
         <label className="register__info">Пароль</label>
         <input className="register__input" type="password"  placeholder=""
         {...register('password', {
            required: 'Введите пароль',
            minLength: { value: 4, message: 'Минимум 4 символа' },
         })}></input>
         <span className="register__error-massage">{errors?.password?.message}</span>
         <span className="register__error-massage">{errorMessage}</span>
         <button className="register__button" disabled={!isValid || isLoading}>Зарегистрироваться</button>
         <div className="register__container">
            <label className="register__redirect-info">Уже зарегистрированы?</label>
            <Link className="register__redirect-button" to="/signin">Войти</Link>
         </div>
      </form>
   )
}

export default Register;