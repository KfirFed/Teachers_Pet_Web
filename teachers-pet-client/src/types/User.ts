export interface ConnectedUser {
    _id: string;
    username: string;
    email: string;
    profileImage: string;
    accessToken: string;
    refreshToken: string;
}

export interface UpdateUser {
    _id: string;
    username: string;
    profileImage: string;
}