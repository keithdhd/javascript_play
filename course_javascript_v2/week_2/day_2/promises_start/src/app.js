const BreedFormView = require('./views/breed_form_view.js');
const DogView = require('./views/dog_view.js');
const Request = require('./helpers/request.js');
const PubSub = require('./helpers/pub_sub.js');

document.addEventListener('DOMContentLoaded', function () {

  new BreedFormView(document.querySelector('#breed-form'));
  new DogView(document.querySelector('#dog-container'));

  PubSub.subscribe('BreedFormView:form-submitted', (event) => {
    const breed = event.detail;
    const url = `https://dog.ceo/api/breed/${ breed }/images`;
    const request = new Request(url);

    const onComplete = (data) => {
      PubSub.publish('Request:dog-data-loaded', data.message);
    }

    request.get(onComplete);
  });

});
