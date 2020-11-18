export interface ISearchFilters {
  name?: string,
  genre?: string,
  releaseDate?: number,
  rating?: number,
  type?: 'movies' | 'series' | 'episode',
  orderBy?: 'creationDate' | 'likes' | 'ratings' | 'views',
  orderType?: 'asc' | 'desc',
  seasonNumber?: number,
  seriesId?: number
}

export default class SearchFilters implements ISearchFilters {
  name?: string;
  genre?: string;
  releaseDate?: number;
  rating?: number;
  type?: 'movies' | 'series';
  orderBy?: 'creationDate' | 'likes' | 'ratings' | 'views';
  orderType?: 'asc' | 'desc';

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
        case 'seriesId':
        case 'orderBy':
        case 'orderType':
          eval('this.' + set.key + '=' + set.value);
          break;
        default:
      }

      if (!this.orderBy) {
        this.orderType = undefined;
      }
    });
  }

  public constructor(urlQuery?: string) {
    if (urlQuery) {
      this.fromUrlQuery(urlQuery);
    }
  }

  public toUrlQuery(questionMark: boolean = false): string {
    const queryArr: string[] = [];
    Object.entries(this).forEach((pair: any) => {
      if (pair.value && (pair.key !== 'orderType' || this.orderBy)) {
        queryArr.push(`${pair.key}=${pair.value}`);
      }
    });

    if (queryArr.length > 0) {
      return (questionMark ? '?' : '') + queryArr.join('&');
    } else {
      return '';
    }
  }
}
