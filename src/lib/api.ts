import axiosClient from "./axios-client";

interface LoginPayload {
  email: string;
  password: string;
}

interface GooglePayload {
  idToken: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface RefreshPayload {
  refreshToken: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  google: async (idToken: string): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/google", {
      idToken,
    });
    return response.data;
  },

  register: async (
    data: RegisterPayload
  ): Promise<{ message: string }> => {
    const response = await axiosClient.post<{ message: string }>(
      "/auth/register",
      data
    );
    return response.data;
  },

  forgotPassword: async (
    email: string
  ): Promise<{ message: string }> => {
    const response = await axiosClient.post<{ message: string }>(
      "/auth/forgot-password",
      { email }
    );
    return response.data;
  },

  getMe: async (): Promise<UserResponse> => {
    const response = await axiosClient.get<UserResponse>("/auth/me");
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },
};
