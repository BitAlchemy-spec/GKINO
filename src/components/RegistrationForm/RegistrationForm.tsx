import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faTimesCircle,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons'; // Добавляем иконки для полей

interface IFormInput {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: IFormInput) => {
    console.log('Регистрация:', data);
    // Здесь можно отправить данные на сервер
  };

  const clearInput = (fieldName: keyof IFormInput) => {
    setValue(fieldName, '');
  };

  // Отслеживаем значения полей для условного отображения иконок очистки
  const usernameValue = watch('username');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.form__title}>Регистрация</h2>

      {/* Поле для Email */}
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
          {usernameValue && ( // Иконка очистки появляется только при наличии текста
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={styles.clearIcon}
              onClick={() => clearInput('username')}
            />
          )}
        </div>
        {errors.username && <span className={styles.form__error}>{errors.username.message}</span>}
      </div>

      {/* Поле для Пароля */}
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
          {passwordValue && ( // Иконка очистки появляется только при наличии текста
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={styles.clearIcon}
              onClick={() => clearInput('password')}
            />
          )}
          <FontAwesomeIcon // Иконка показать/скрыть пароль
            icon={showPassword ? faEye : faEyeSlash}
            className={styles.togglePasswordIcon}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && <span className={styles.form__error}>{errors.password.message}</span>}
      </div>

      {/* Поле для Подтверждения пароля */}
      <div className={styles.form__group}>
        <label className={styles.form__label}>
          <FontAwesomeIcon icon={faLock} className={styles.labelIcon} /> Подтвердите пароль
        </label>
        <div className={styles.inputWrapper}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className={styles.form__input}
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: (value) => value === watch('password') || 'Пароли не совпадают', // Логика сравнения паролей
            })}
          />
          {confirmPasswordValue && ( // Иконка очистки появляется только при наличии текста
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={styles.clearIcon}
              onClick={() => clearInput('confirmPassword')}
            />
          )}
          <FontAwesomeIcon // Иконка показать/скрыть пароль
            icon={showConfirmPassword ? faEye : faEyeSlash}
            className={styles.togglePasswordIcon}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        {errors.confirmPassword && (
          <span className={styles.form__error}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit" className={styles.form__button}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegistrationForm;
