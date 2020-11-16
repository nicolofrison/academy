import axios from 'axios';

export default class Videos {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.orderBy = ['views', 'creationDate', 'suggested'];
    }

    getInstance(baseUrl) {
        if (!this.videos) {
            this.videos = new Videos(baseUrl);
        }
        return this.videos;
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