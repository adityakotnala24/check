import { URLs } from "@/utils";
import { DeptSingnUpFormType } from "./DeptInputsContainer";

interface SignUpResponse {
  status: 'success' | 'error',
  message: string;
}

export const signUpDepartmentUser = async (formData: any): Promise<SignUpResponse> => {
  try {
    const deptUserCredentials = new FormData();
    deptUserCredentials.append('district', formData.district);
    deptUserCredentials.append('department', formData.department);
    deptUserCredentials.append('userName', formData.userName);
    deptUserCredentials.append('mobileNumber', formData.mobileNumber);
    deptUserCredentials.append('password', formData.password);
    console.log(`${URLs.baseUrl}signup-dept.php`);
    

    const response = await fetch(`${URLs.baseUrl}signup-dept.php`, {
      method: 'POST',
      body: deptUserCredentials,
    });

    const signUpResponse: SignUpResponse = await response.json();
    return signUpResponse;
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Something went wrong. Please try again later.'
    };
  }
};

export const fetchSelectOptions = async (url: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    setState(data);
  } catch (error) {
    console.error(error);
  }
};

export const createFormData = (): DeptSingnUpFormType => {
  return {
    district: '',
    department: '',
    userName: '',
    mobileNumber: '',
    password: ''
  };
};

interface LoginUserInfo {
  userName: string;
  hoff: string;
  chief: string;
  conservator: string;
  dfo: string;
  rangeId: string;
  rangeNameEng: string;
}

interface LoginResponseData {
  token: string,
  user: LoginUserInfo;
}

export interface LoginResponse {
  status: 'success' | 'error',
  message: string,
  data: LoginResponseData | null;
}

export const hanldeDepartmentLogin = async (mobileNumber: string, password: string): Promise<LoginResponse> => {
  try {
    const deptUserCredentials = new FormData();
    deptUserCredentials.append('mobileNumber', mobileNumber);
    deptUserCredentials.append('password', password);

    const response = await fetch(`${URLs.baseUrl}login-dept.php`, {
      method: 'POST',
      body: deptUserCredentials,
    });

    const loginResponse: LoginResponse = await response.json();

    return loginResponse;
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Something went wrong. Please try again later.',
      data: null
    };
  }
};