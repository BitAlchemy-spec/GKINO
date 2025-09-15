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
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetRegister,
    setValue: setRegisterValue,
    watch: watchRegister,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormInputs>();
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
    setValue: setLoginValue,
    watch: watchLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInputs>();
  const registerEmail = watchRegister('email', '');
  const loginEmail = watchLogin('email', '');
  const onRegister = (data: RegisterFormInputs) => {
    console.log('Регистрация:', data);
    resetRegister(); // очистить форму после отправки
  };

  const onLogin = (data: LoginFormInputs) => {
    console.log('Вход:', data);
    resetLogin();
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__card}>
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

        {activeTab === 'register' && (
          <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
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

            <div className={styles.form__group}>
              <label className={styles.form__label}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.labelIcon} />
                Email:
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  className={styles.form__input}
                  placeholder="Введите email"
                  {...register('email', { required: 'Введите email' })}
                />
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

            <button type="submit" className={styles.form__button}>
              Зарегистрироваться
            </button>
          </form>
        )}

        {activeTab === 'login' && (
          <form className={styles.form} onSubmit={handleLoginSubmit(onLogin)}>
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
