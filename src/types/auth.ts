export interface LogInAPIParams {
	email: string;
	password: string;
}

export interface UserKeyword {
	userKeywordList: string[];
}
export interface User {
	id: string;
	email: string;
	username: string;
	nickname: string;
	role: "USER" | "ADMIN";
	gender: "MALE" | "FEMALE";
	birthDate: string;
	providerId: string;
	profileImageUrl: string;
	userKeywords: UserKeyword;
}
