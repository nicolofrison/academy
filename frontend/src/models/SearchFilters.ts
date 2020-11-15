export interface ISearchFilters {
  name?: string,
  genre?: string,
  releaseDate?: string,
  rating?: number,
  type?: 'movies' | 'series',
  orderBy?: [
    'creationDate' | 'likes' | 'ratings' | 'views',
    'asc' | 'desc'
  ],
}

export default class SearchFilters implements ISearchFilters {
  name?: string;
  genre?: string;
  releaseDate?: string;
  rating?: number;
  type?: 'movies' | 'series';
  orderBy?: [
    'creationDate' | 'likes' | 'ratings' | 'views',
    'asc' | 'desc'
  ];

  private fromUrlQuery(urlQuery: string): void {
    const queryArr: string[] = urlQuery.split('&');
    const keyValueArr = queryArr.map((kv: string) => {
      const arr: string[] = kv.split('=');
      return {
        key: arr[0],
        value: arr[1]
      }
    });

    keyValueArr.forEach((set) => {
      switch (set.key) {
        case 'name':
        case 'genre':
        case 'releaseDate':
        case 'rating':
        case 'type':
          eval('this.' + set.key + '=' + set.value);
          break;
        case 'orderBy':
          const orderByArr: string[] = set.value.split(',');
          switch (orderByArr[0]) {
            case 'creationDate':
            case 'likes':
            case 'ratings':
            case 'views':
              this.orderBy[0] = orderByArr[0];
              if (orderByArr[1] && orderByArr[1] === 'asc' || orderByArr[1] === 'desc') {
                this.orderBy[1] = orderByArr[1];
              }
              break;
            default:
          }
          break;
        default:
      }
    });
  }

  public constructor(urlQuery?: string) {
    if (urlQuery) {
      this.fromUrlQuery(urlQuery);
    }
  }


  public toUrlQuery(questionMark: boolean = false): string {
    let query = questionMark ? '?' : '';

    const queryArr: string[] = [];
    eval(this.name ? 'queryArr.push(\'name=\' + this.name)' : '');
    eval(this.genre ? 'queryArr.push(\'genre=\' + this.genre)' : '');
    eval(this.releaseDate ? 'queryArr.push(\'releaseDate=\' + this.releaseDate)' : '');
    eval(this.rating ? 'queryArr.push(\'rating=\' + this.rating)' : '');
    eval(this.type ? 'queryArr.push(\'type=\' + this.type)' : '');

    /*
    query += this.name ? 'name=' + this.name : '';
    query += this.genre ? 'genre=' + this.genre : '';
    query += this.releaseDate ? 'releaseDate=' + this.releaseDate : '';
    query += this.rating ? 'rating=' + this.rating : '';
    query += this.type ? 'type=' + this.type : '';
*/

    if (this.orderBy && this.orderBy.length > 0) {
      let orderBy = 'orderBy=' + this.orderBy[0];
      if (this.orderBy[1]) {
        orderBy += encodeURIComponent(',') + this.orderBy[1];
      }

      queryArr.push(orderBy);
    }

    if (queryArr.length > 0) {
      return (questionMark ? '?' : '') + queryArr.join('&');
    } else {
      return '';
    }
  }
}
