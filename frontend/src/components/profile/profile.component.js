import appModule from '../../app.module';

appModule
  .component('myProfile', {
    templateUrl: '/src/components/profile/profile.html',
    controller: ['cssInjector', (cssInjector) => {
      cssInjector.add('/src/components/profile/changeProfile.css');
    }],
  });
