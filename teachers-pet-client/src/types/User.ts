export interface ConnectedUser {
    _id: string;
    username: string;
    email: string;
    profileImage: string;
    accessToken: string;
    refreshToken: string;
}