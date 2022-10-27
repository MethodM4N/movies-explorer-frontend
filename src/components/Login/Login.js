import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import headerLogo from '../../images/header-logo.svg'

function Login({ onLogin }) {

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
      onLogin(getValues());
      reset({
         isValid: false,
      });
   }

   return (
      <form className="login" noValidate={true} onSubmit={handleSubmit(onSubmit)}>
         <Link to="/" className="login__head-link"><img className="header__logo" src={headerLogo} alt="Лого"/></Link>
         <h2 className="login__title">Рады видеть!</h2>
         <label className="login__info">E-mail</label>
         <input className="login__input" placeholder=""
         {...register('email', {
            required: 'Введите email',
            pattern: {
            value: /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i,
            message: 'Введите корректный email',
            },
         })}></input>
         <span className="login__error-massage">{errors?.email?.message}</span>
         <label className="login__info">Пароль</label>
         <input className="login__input" type="password"  placeholder=""
         {...register('password', {
            required: 'Введите пароль',
            minLength: { value: 4, message: 'Минимум 4 символа' },
         })}></input>
         <span className="login__error-massage">{errors?.password?.message}</span>
         <button className="login__button" disabled={!isValid}>Войти</button>
         <div className="login__container">
            <label className="login__redirect-info">Ещё не зарегистрированы?</label>
            <Link className="login__redirect-button" to="/signup">Регистрация</Link>
         </div>
      </form>
   )
}

export default Login;