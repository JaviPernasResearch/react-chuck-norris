import { CatPic } from "@/models/catPic";
import { QueryData } from "@/models/queryData";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const _getRandomCatPic = () => {
    return axios
        .get<CatPic>("https://cataas.com/cat?json=true")
        .catch((error) => {
            console.error(error);
            toast.error("Error getting joke");
            throw error;
    });
};
    
export const getRandomCatPic = (): QueryData<AxiosResponse<CatPic, unknown>> => ({
    queryKey: ["randomCatPic"],
    queryFn: () => _getRandomCatPic(),
});