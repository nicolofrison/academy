import appModule from '../../app.module';

function navbarController(storageService, $location) {
  this.logout = () => {
    storageService.save('loggedIn', false);
    $location.path('/home');
  };
}

appModule
  .component('myNavbar', {
    templateUrl: '/src/components/navbar/navbar.html',
    bindings: {
      loggedIn: '<',
    },
    controller: ['storageService', '$location', navbarController],
  });
