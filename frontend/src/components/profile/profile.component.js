import appModule from '../../app.module';

appModule
  .component('myProfile', {
    templateUrl: '/app/components/profile/profile.html',
    controller: ['cssInjector', (cssInjector) => {
      cssInjector.add('/app/components/profile/changeProfile.css');
    }],
  });
