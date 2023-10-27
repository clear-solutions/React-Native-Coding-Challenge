import { API } from "../constants/Api"
import { ITodo } from "../types"

export default class Client {
    private static url: string = API.BASE_API_URL

    static async get (endpoint:string): Promise<ITodo[]> {
        const data:Promise<ITodo[]> = fetch(this.url + endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json());
      
        return data;
    }


    ///Post method can be also added to here
}