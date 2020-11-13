import appModule from '../../app.module';

appModule
  .component('myLogin', {
    templateUrl: '/src/components/login/login.html',
    controllerAs: 'loginCtrl',
    controller: ['storageService', function (storageService) {
      this.loginForm = {};
      this.login = function () {
        // request to api
        const loggedIn = true;

        if (loggedIn) {
          console.log(`email: ${this.loginForm.email} password: ${this.loginForm.password}`);
          storageService.save('loggedIn', true);
          window.location.href = '/#!/Home';
        } else {
          console.log('Email and/or password are incorrect!');
        }
      };
    }],
  });
