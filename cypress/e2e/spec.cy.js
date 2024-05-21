const testwebsite = "https://www.demoblaze.com/";
const testproductaddtocart = "https://www.demoblaze.com/prod.html?idp_=1";
//хардкодимо, але трошки))
var USER = "OnlyMyTestUser";
var PASSWORD = "2@2@8vKSTrPkyCd";

const waittimeout = 2000;
const faker = require('faker');
// Генеруємо випадкове ім'я
const randomName = faker.name.findName()+'Test';
// Генеруємо пароль
const randomPassword = faker.internet.password();
const creditcardNumber = faker.finance.creditCardNumber();
const creditcardMonth = faker.date.month();
const creditcardYear = faker.datatype.number({ min: 2024, max:2034 });

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
  "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
  "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Вибираємо випадкову країну зі списку
const randomIndex = Math.floor(Math.random() * countries.length);
const randomCountry = countries[randomIndex];

function login(){
  cy.get('#login2').click();

  cy.get('.modal-dialog').should('be.visible');
  cy.get('#loginusername')
    .should('be.visible')
    .clear()
    .type(randomName);
  cy.wait(waittimeout);
  cy.get('#loginpassword')
    .clear()
    .type(randomPassword);

  cy.get('button[type="button"]')
    .should('be.visible')
    .contains('Log in')
    .click();

  cy.wait(waittimeout);
  cy.contains('Welcome ' + randomName).should('be.visible');
}


describe('Accessibility Tests', () => {

  it('Should pass accessibility tests', () => {
    cy.visit(testwebsite);
    
    cy.title().should('eq', 'STORE');
    //тест доступності необхідних та обов'язкових елементів
  })
})

describe('Test for Sign UP', () => {

  it('Sign up with correct user data', () => {
    cy.visit(testwebsite);
    cy.get('#signin2').click();

    cy.get('.modal-dialog').should('be.visible');
    cy.get('#sign-username')
    .should('be.visible')
    .clear()
    .type(randomName);
    cy.get('#sign-password')
    .clear()
    .type(randomPassword);

    cy.get('button[type="button"]')
      .should('be.visible')
      .contains('Sign up')
      .click();

    cy.wait(waittimeout);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Sign up successful.');
    });
  })
})

describe('Tests for Log In and Log Out', () => {

  it('Log in with wrong PASS', () => {
    cy.visit(testwebsite)
    cy.get('#login2').click()

    cy.get('.modal-dialog').should('be.visible');
    cy.get('#loginusername')
    .should('be.visible')
    .clear()
    .type(randomName);
    cy.get('#loginpassword')
    .clear()
    .type(122334);

    cy.get('button[type="button"')
    .should('be.visible')
    .contains('Log in')
    .click();

    cy.wait(waittimeout);
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Wrong password.');
    });
  })

  it('log in with correct user data', () => {
    cy.visit(testwebsite);
    login();
  })

  it('Log OUT', () => {
    cy.visit(testwebsite);
    login();

    cy.get('#logout2').click();

    cy.wait(waittimeout);
    cy.get('#login2').should('be.visible');
  })


  describe('Add the product to the card and purchase it', () => {
    it('Shop cart and purchasing', () => {
      cy.visit(testproductaddtocart)
      login();

      cy.get('a.btn.btn-success.btn-lg').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Product added');
      });
      cy.get('#cartur').click()
      cy.wait(waittimeout)
      cy.contains('Samsung galaxy s6').should('be.visible');
      cy.get('button[type="button"]')
      .should('be.visible')
      .contains('Place Order')
      .click();
      cy.get('.modal-content').should('be.visible');
      cy.wait(waittimeout);
      cy.get('#name')
      .should('be.visible')
      .clear()
      .type(randomName);
      cy.wait(waittimeout);
      cy.get('#country')
      .should('be.visible')
      .clear()
      .type(randomCountry);
      cy.wait(waittimeout);
      cy.get('#city')
      .should('be.visible')
      .clear()
      .type(randomCountry); // можна додати генератор випадкового міста
      cy.wait(waittimeout);
      cy.get('#card')
      .should('be.visible')
      .clear()
      .type(creditcardNumber);
      cy.wait(waittimeout);
      cy.get('#month')
      .should('be.visible')
      .clear()
      .type(creditcardMonth);
      cy.wait(waittimeout);
      cy.get('#year')
      .should('be.visible')
      .clear()
      .type(creditcardYear);
      cy.wait(waittimeout);
      cy.get('button[type="button"]')
      .should('be.visible')
      .contains('Purchase')
      .click();
      cy.wait(waittimeout);

      cy.contains('Thank you for your purchase!').should('be.visible');
      cy.contains('Card Number: ' + creditcardNumber).should('be.visible');
      cy.contains('Name: ' + randomName).should('be.visible');
    })
  })

})