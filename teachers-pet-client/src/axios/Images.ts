import axiosConnection from "./AxiosConnection";

const IMAGES_ROUTE = "/image";

export const axiosCreateImage = async (imageData: FormData): Promise<Response> => {
    try {
        return await axiosConnection.post(`${IMAGES_ROUTE}`, imageData, {
            headers: {
                "Content-Type": "image/jpeg",
            },
        });;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Saved failed");
    }
};