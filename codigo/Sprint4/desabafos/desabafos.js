var json;
$(document).ready(function () {
  // FETCHING DATA FROM JSON FILE
  $.getJSON('data.json', function (data) {
    if (localStorage.getItem('desabafo')) {
    } else {
      localStorage.setItem('desabafo', JSON.stringify(data));
    }
    json = JSON.parse(localStorage.getItem('desabafo'));
    var desabafo = '';
    // ITERATING THROUGH OBJECTS
    $.each(json, function (key, value) {
      desabafo =
        desabafo +
        `<div id="dbf"><h3> ${value.nome} </h3> <p>${value.desabafo}</p> <button type="button" class="btn btn-primary">Responder</button></div>`;
    });

    //INSERTING ROWS INTO TABLE
    $('#desabafos').append(desabafo);
  });
});
function list() {
  var desabafo = '';
  $('#desabafos').children().remove();
  $.each(json, function (key, value) {
    desabafo =
      desabafo +
      `<div id="dbf"><h3> ${value.nome} </h3> <p>${value.desabafo}</p> <button type="button" class="btn btn-primary">Responder</button></div>`;
  });

  //INSERTING ROWS INTO TABLE
  $('#desabafos').append(desabafo);
}

document.getElementById('envio').addEventListener('click', enviar);
function enviar() {
  var input = document.querySelector('#nome2');
  var input2 = document.querySelector('#desabafoTxt');
  if (input.value) {
    var nome = input.value;
  }else {
    var nome = "Anônimo";
  }
  if (input2.value) {
    var desabafo = {
      id: json.length + 1,
      nome,
      desabafo: input2.value,
    };
    json.push(desabafo);
    console.log(json);
    localStorage.setItem('desabafo', JSON.stringify(json));
    list();
    input2.value = '';
    input.value = '';
    alert('Enviado com sucesso');
  } else {
    alert('Você precisa escrever algo!!');
  }
}
