class User {
  constructor(firstName, lastName, age, birthDate, present=true) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.birthDate = birthDate;
    this.present = present;
  }
}

(function() {
  var app = angular.module('evaluation', []);

  const users = [
    new User('nome1', 'cognome', 22, new Date()),
    new User('nome', 'cognome', 30, new Date()),
    new User('nome', 'cognome', 19, new Date()),
    new User('nome', 'cognome', 20, new Date()),
  ];
  app.controller('StudentController', function() {
    this.age = (new Date().getFullYear()) - 1997;
    this.students = users;
  });

  var kites = [
    {
      name: 'Rebel 2018',
      price: 1500.99,
      brand: 'North Kiteboarding',
      description: 'The best ever Rebel',
      canPurchase: true,
      availableFrom: 1586722400000,
      reviews: [],
    },
    {
      name: 'EVO 2018',
      price: 1390,
      brand: 'North Kiteboarding',
      description: 'Only the sky is the limit',
      canPurchase: true,
      availableFrom: new Date(),
      reviews: [],
    },
    {
      name: 'FX',
      price: 1430.99,
      brand: 'Cabrinha',
      description: 'For freestylers addicted',
      canPurchase: true,
      availableFrom: 1506722400000,
      reviews: [
        {
          createdAt: '2017-10-06',
          author: 'Tobia Lanza',
          body: ''
        },
        {
          createdAt: '2017-09-30',
          author: 'Paolone',
          body: ''
        },
      ],
    },
  ];
  app.controller('StoreController', function() {
    this.products = kites;
  });

  app.controller('TabController', function() {
    let tab = 1;
    this.select = function(newTab) {
      tab = newTab;
    }

    this.isSelected = function(newTab) {
      return tab === newTab;
    }
  });

  app.controller('ReviewController', function() {
    this.review = {
      author: '',
      body: ''
    }
    const that = this;

    this.addReview = function(product) {
      const review = {
        body: that.review.body,
        author: that.review.author,
        createdAt: new Date(),
      };
      product.reviews.push(review);
    }
  });
})();