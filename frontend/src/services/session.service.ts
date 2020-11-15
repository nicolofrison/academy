import appModule from '../app.module';

appModule
  .service('storageService', function () {
    this.get = (key: string): any => {
      //  console.log('get');
      return sessionStorage.getItem(key);
    };

    this.save = (key: string, data: any) => {
      //  console.log('set');
      sessionStorage.setItem(key, data);
    };
  });
