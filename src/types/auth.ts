export interface LoginRequest {
	login: string;
	password: string;
}

export interface LoginResponse {
	message: string;
}

export interface LogoutResponse {
	message: string;
}
