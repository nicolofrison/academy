import appModule from '../../app.module';

appModule
  .component('mySearch', {
    templateUrl: '/src/components/search/search.html',
    controller: ['cssInjector', (cssInjector) => {
      cssInjector.add('/src/components/search/search.css');
    }],
  });
