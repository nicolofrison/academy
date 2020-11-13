import axios from 'axios';

export const videosService = new VideosService();

export default class VideosService {
    constructor() {
        this.baseUrl = '';
        this.orderBy = ['views', 'creationDate', 'suggested'];
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getVideos(orderBy) {
        let params = {};
        switch (orderBy) {
            case 'views':
                params = {
                    orderBy: 'views',
                    orderType: 'desc'
                }
                break;
            case 'creationDate':
                params = {
                    orderBy: 'creationDate',
                    orderType: 'desc'
                }
                break;
            case 'suggested':
                params = {
                    orderBy: 'suggested',
                    orderType: 'desc'
                }
                break;
            default:
        }

        const response = await axios.get(this.baseUrl + '/videos', {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: params
            }
        );
        return response.data;
    }
}