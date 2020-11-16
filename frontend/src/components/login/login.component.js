import appModule from '../../app.module';

appModule
  .component('myLogin', {
    templateUrl: '/src/components/login/login.html',
    controllerAs: 'loginCtrl',
    controller: ['sessionService', function (sessionService) {
      this.loginForm = {};
      this.login = function () {
        // request to api
        const loggedIn = true;

        if (loggedIn) {
          console.log(`email: ${this.loginForm.email} password: ${this.loginForm.password}`);
          sessionService.save('loggedIn', true);
          sessionService.save('userId', 1);
          window.location.href = '/#!/Home';
        } else {
          console.log('Email and/or password are incorrect!');
        }
      };
    }],
  });
