import appModule from '../../app.module';

const cssPath = '/src/components/profile/changeProfile.css';

appModule
  .component('myProfile', {
    templateUrl: '/src/components/profile/profile.html',
    controller: ['cssInjector', function (cssInjector) {
      this.$onInit = function () {
        cssInjector.add(cssPath);
      };
      this.$onDestroy = function () {
        cssInjector.remove(cssPath);
      };
    }],
  });
