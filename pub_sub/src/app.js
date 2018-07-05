const InstrumentList = require('./models/instrument_list');
const SelectView = require('./views/select_view');
const DetailView = require('./views/detail_view');

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hello");

  const selectView = new SelectView(document.querySelector('#select-family'));
  selectView.bindEvents();
  selectView.receiveData();

  const detailView = new DetailView(document.querySelector('#instrument-details'));
  detailView.bindEvents();

  const instrumentList = new InstrumentList();
  instrumentList.bindEvents();
  instrumentList.getData();

});
