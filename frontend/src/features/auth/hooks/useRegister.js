import { useState } from 'react';
import { isValidEmail, validatePassword} from '../../../utils/validations';
import { cleanFormData } from '../../../utils/utils';
import { DEFAULT_PROFILE_IMAGE } from '../../../config';
import { createUserRequest } from '../../../services/userService';

export default function useRegister() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const registerUser = async (formData) => {  
    const cleanedData = formData

      console.log("Cleaned form data:", cleanedData);

    
    setError('');
    
    const user = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phoneNumber || null,
        password: formData.password,
        is_admin: false,
        is_employee: true, // o false, según de quién se trate
    };


      try {
        console.log("User data to register:", user);
      await createUserRequest(user);
      setSuccess(true);
      return true;
    } catch (err) {
      console.error("Register failed", err);
      setError('Error al registrar el usuario. Por favor, intenta nuevamente.');
      return false;
    }
  };

  return { registerUser, error, success };
}
