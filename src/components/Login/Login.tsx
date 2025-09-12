import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faTimesCircle,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

interface IFormInput {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate(); // Инициализируем useNavigate

  const onSubmit = (data: IFormInput) => {
    const localUsername = 'user@example.com';
    const localPassword = 'password123';

    if (data.username === localUsername && data.password === localPassword) {
      console.log('Вход успешен! Перенаправление на главную страницу.');
      setLoginError(null);
      navigate('/'); // Перенаправляем пользователя на корневой маршрут
    } else {
      console.log('Неверные учетные данные');
      setLoginError('Неверный email или пароль.');
    }
  };

  const clearInput = (fieldName: keyof IFormInput) => {
    setValue(fieldName, '');
    setLoginError(null);
  };

  const usernameValue = watch('username');
  const passwordValue = watch('password');

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.form__title}>Вход</h2>

      {loginError && <span className={styles.form__error}>{loginError}</span>}

      <div className={styles.form__group}>
        <label className={styles.form__label}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.labelIcon} /> Email
        </label>
        <div className={styles.inputWrapper}>
          <input
            className={styles.form__input}
            {...register('username', {
              required: 'Введите email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный формат email',
              },
            })}
          />
          {usernameValue && (
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={styles.clearIcon}
              onClick={() => clearInput('username')}
            />
          )}
        </div>
        {errors.username && <span className={styles.form__error}>{errors.username.message}</span>}
      </div>

      <div className={styles.form__group}>
        <label className={styles.form__label}>
          <FontAwesomeIcon icon={faLock} className={styles.labelIcon} /> Пароль
        </label>
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            className={styles.form__input}
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
            })}
          />
          {passwordValue && (
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={styles.clearIcon}
              onClick={() => clearInput('password')}
            />
          )}
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className={styles.togglePasswordIcon}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && <span className={styles.form__error}>{errors.password.message}</span>}
      </div>

      <button type="submit" className={styles.form__button}>
        Войти
      </button>
    </form>
  );
};

export default Login;
