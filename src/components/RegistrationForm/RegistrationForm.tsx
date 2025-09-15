import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faUser,
  faTimes,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import styles from './RegistrationForm.module.css';

// =========================
// Типы данных для форм
// =========================
type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};

type LoginFormInputs = {
  email: string;
  password: string;
};

const AuthForm: React.FC = () => {
  // Активная вкладка: "register" или "login"
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');

  // Состояние показа/скрытия пароля
  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // React Hook Form (регистрация)
  // =========================
  const {
    register,
    handleSubmit,
    reset: resetRegister,
    setValue: setRegisterValue,
    watch: watchRegister,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormInputs>();

  // =========================
  // React Hook Form (логин)
  // =========================
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
    setValue: setLoginValue,
    watch: watchLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInputs>();

  // =========================
  // Отслеживаем значения email
  // =========================
  const registerEmail = watchRegister('email', '');
  const loginEmail = watchLogin('email', '');

  // =========================
  // Обработчики форм
  // =========================
  const onRegister = (data: RegisterFormInputs) => {
    console.log('Регистрация:', data);
    resetRegister(); // очистить форму после отправки
  };

  const onLogin = (data: LoginFormInputs) => {
    console.log('Вход:', data);
    resetLogin(); // очистить форму после отправки
  };

  return (
    <div className={styles.auth}>
      {/* ====== Общая карточка ====== */}
      <div className={styles.auth__card}>
        {/* ====== Табы ====== */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'register' ? styles.active : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Регистрация
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Вход
          </button>
        </div>

        {/* ====== Форма регистрации ====== */}
        {activeTab === 'register' && (
          <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
            {/* Имя пользователя */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>
                <FontAwesomeIcon icon={faUser} className={styles.labelIcon} />
                Имя пользователя:
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  className={styles.form__input}
                  placeholder="Введите имя.."
                  {...register('username', { required: 'Введите имя пользователя' })}
                />
                {/* Очистка поля */}
                <FontAwesomeIcon
                  icon={faTimes}
                  className={styles.clearIcon}
                  onClick={() => setRegisterValue('username', '')}
                />
              </div>
              {registerErrors.username && (
                <p className={styles.form__error}>{registerErrors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.labelIcon} />
                Email:
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  className={styles.form__input}
                  placeholder="Введите email.."
                  {...register('email', { required: 'Введите email' })}
                />
                {/* Очистка email (только если есть текст) */}
                {registerEmail && (
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.clearIcon}
                    onClick={() => setRegisterValue('email', '')}
                  />
                )}
              </div>
              {registerErrors.email && (
                <p className={styles.form__error}>{registerErrors.email.message}</p>
              )}
            </div>

            {/* Пароль */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>
                <FontAwesomeIcon icon={faLock} className={styles.labelIcon} />
                Пароль:
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles.form__input}
                  placeholder="Введите пароль"
                  {...register('password', { required: 'Введите пароль' })}
                />
                {/* Иконка скрыть/показать */}
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={styles.togglePasswordIcon}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
              {registerErrors.password && (
                <p className={styles.form__error}>{registerErrors.password.message}</p>
              )}
            </div>

            {/* Кнопка */}
            <button type="submit" className={styles.form__button}>
              Зарегистрироваться
            </button>
          </form>
        )}

        {/* ====== Форма входа ====== */}
        {activeTab === 'login' && (
          <form className={styles.form} onSubmit={handleLoginSubmit(onLogin)}>
            {/* Email */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.labelIcon} />
                Email
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  className={styles.form__input}
                  placeholder="Введите email"
                  {...loginRegister('email', { required: 'Введите email' })}
                />
                {/* Очистка email (только если есть текст) */}
                {loginEmail && (
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.clearIcon}
                    onClick={() => setLoginValue('email', '')}
                  />
                )}
              </div>
              {loginErrors.email && (
                <p className={styles.form__error}>{loginErrors.email.message}</p>
              )}
            </div>

            {/* Пароль */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>
                <FontAwesomeIcon icon={faLock} className={styles.labelIcon} />
                Пароль
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles.form__input}
                  placeholder="Введите пароль"
                  {...loginRegister('password', { required: 'Введите пароль' })}
                />
                {/* Иконка скрыть/показать */}
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={styles.togglePasswordIcon}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
              {loginErrors.password && (
                <p className={styles.form__error}>{loginErrors.password.message}</p>
              )}
            </div>

            {/* Кнопка */}
            <button type="submit" className={styles.form__button}>
              Войти
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
