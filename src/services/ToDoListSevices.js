import axios from "axios"
import { DOMAIN } from "../util/constants/settingSystem";

export class ToDoListService {
    getTaskApi = () => {
        return axios.get(`${DOMAIN}?pagination[page]=1&pagination[pageSize]=4&populate=*`)
    }

    getTaskListApiPaginationSaga = (page) => {
        return axios.get(`${DOMAIN}?pagination[page]=${page}&pagination[pageSize]=4&populate=*`)
    }

}

export const toDoListService = new ToDoListService();

 
