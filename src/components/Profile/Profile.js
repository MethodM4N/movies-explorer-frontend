import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onEditProfile, onLogout, feedbackMessage }) {
   const currentUser = useContext(CurrentUserContext);
   const [name, setName] = useState(currentUser.name);
   const [email, setEmail] = useState(currentUser.email);

   const {
      register,
      getValues,
      formState: { errors, isValid },
      handleSubmit,
      reset,
      setValue,
   } = useForm({
      mode: 'onChange',
   });

   function onSubmit() {
      onEditProfile(getValues());
      reset();
   }

   useEffect(() => {
      setName(currentUser.name);
      setEmail(currentUser.email);
   }, [currentUser]);

   useEffect(() => {
      setValue('name', currentUser.name);
      setValue('email', currentUser.email);
   }, [currentUser]);

   return (
      <form className="profile" onSubmit={handleSubmit(onSubmit)}>
         <h2 className="profile__title">Привет, {name}!</h2>
         <div className="profile__container">
            <p className="profile__info">Имя</p>
            <input className="profile__input" placeholder={name}
            {...register('name', {
               required: 'Введите имя',
               minLength: { value: 2, message: 'Минимум 2 символа' },
               pattern: {
               value: /^[A-Za-zА-Яа-я -]+$/,
               message: 'Допустимы только буквы',
               },
            })}></input>
         </div>
         <span className="profile__error-massage">{errors?.name?.message}</span>
         <div className="profile__container">
            <p className="profile__info">E-mail</p>
            <input className="profile__input" placeholder={email}
            {...register('email', {
            required: 'Введите email',
            pattern: {
            value: /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i,
            message: 'Введите корректный email',
            },
            })}></input>
         </div>
         <span className="profile__error-massage">{errors?.email?.message}</span>
         <button className="profile__button" disabled={!isValid || feedbackMessage}>{feedbackMessage ? feedbackMessage : 'Редактировать'}</button>
         <button className="profile__button" onClick={onLogout}>Выйти из аккаунта</button>
      </form>
   )
}

export default Profile;