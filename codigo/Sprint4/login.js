meuStorage = localStorage;

localStorage.removeItem('user');

var jsonUserDb = {
  data: [
    {
      id: 1,
      name: 'Roberto Henrique da Silva',
      email: 'roberto@gmail.com',
      date: '2022-05-02',
      celnumber: '123',
      cpf: '321',
      pwd: '1234',
      ocupacao: 'estudante',
    },
    {
      id: 2,
      name: 'Roberto Henrique da Silva2',
      email: 'roberto2@gmail.com',
      date: '2022-05-02',
      celnumber: '123',
      cpf: '321',
      pwd: '1234',
      ocupacao: 'estudante',
    },
    {
      id: 3,
      name: 'Roberto Henrique da Silva3',
      email: 'roberto3@gmail.com',
      date: '2022-05-02',
      celnumber: '123',
      cpf: '321',
      pwd: '1234',
      ocupacao: 'profissional',
    },
    {
      id: 4,
      name: 'Roberto Henrique da Silva4',
      email: 'roberto4@gmail.com',
      date: '2022-05-02',
      celnumber: '123',
      cpf: '321',
      pwd: '1234',
      ocupacao: 'profissional',
    },
  ],
};

var jsonHistorico = {
  data: [
    { userId: 1, consultaId: 2, data: '5/15/22' },
    { userId: 1, consultaId: 3, data: '1/02/22' },
    { userId: 1, consultaId: 4, data: '1/12/22' },
  ],
};

var bdUsers;
var dataHistorico = JSON.stringify(jsonHistorico);
var dataUsers = JSON.stringify(jsonUserDb);
const init = () => {
  function localStorageSetItem(string, item) {
    console.log(localStorage.getItem(string));
    if (!localStorage.getItem(string)) {
      localStorage.setItem(string, item);
    }
  }
  if (!localStorage.getItem('users')) {
    localStorageSetItem('users', dataUsers);
  }

  if (!localStorage.getItem('historico')) {
    localStorageSetItem('historico', dataHistorico);
  }

  function localStorageGetItem(string) {
    bdUsers = JSON.parse(localStorage.getItem(string));
  }
  localStorageGetItem('users');
};
window.onload = function () {
  init();
};

const container = document.querySelector('.container'),
  pwShowHide = document.querySelectorAll('.showHidePw'),
  pwFields = document.querySelectorAll('.password'),
  signUp = document.querySelector('.signup-link'),
  login = document.querySelector('.login-link');

//   js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener('click', () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === 'password') {
        pwField.type = 'text';

        pwShowHide.forEach((icon) => {
          icon.classList.replace('uil-eye-slash', 'uil-eye');
        });
      } else {
        pwField.type = 'password';

        pwShowHide.forEach((icon) => {
          icon.classList.replace('uil-eye', 'uil-eye-slash');
        });
      }
    });
  });
});

// js code to appear signup and login form
signUp.addEventListener('click', () => {
  container.classList.add('active');
  test();
});
login.addEventListener('click', () => {
  container.classList.remove('active');
});

function test() {
  function gerarID() {
    let novoId = 1;
    if (jsonUserDb.data.length != 0)
      novoId = jsonUserDb.data[jsonUserDb.data.length - 1].id + 1;
    return novoId;
  }
  document
    .querySelector('form.cadastro')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      let name = document.getElementById('inputName').value;
      let email = document.getElementById('inputEmail').value;
      let date = document.getElementById('inputDate').value;
      let celnumber = document.getElementById('inputCelNumber').value;
      let cpf = document.getElementById('inputCPF').value;
      let pwd = document.getElementById('inputPwd').value;
      let ocupacao = document.getElementById('inputOcupacao').value;
      let id = gerarID();
      var usuario = {
        id: id,
        name: name,
        email: email,
        date: date,
        celnumber: celnumber,
        cpf: cpf,
        pwd: pwd,
        ocupacao: ocupacao,
      };
      bdUsers.data.push(usuario);
      function localStorageSetItem2(string, item) {
        localStorage.setItem(string, JSON.stringify(item));
      }
      localStorageSetItem2('users', bdUsers);
      init();
      alert('Conta criada com sucesso!!');
      container.classList.remove('active');
      if (ocupacao === 'paciente')
        window.open('login/quiz.html', 'janelaNova');
    });
}

function search(email, pwd, inputArray) {
  if (email === 'admin' && pwd === '1234') {
    alert('Bem vindo admin!');
    window.location.href = 'admin';
    return;
  }
  let verification = 0;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].email === email && inputArray[i].pwd === pwd) {
           const user = {
        id: inputArray[i].id,
        name: inputArray[i].name,
        email: inputArray[i].email,
      };
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      verification = 1;
      window.location.href = 'perfil';
      return;
    }
  }
  if (verification === 0) {
    alert('senha incorreta');
    return;
  }
  alert('conta inexistente no sistema');
}

document.querySelector('form.vEntrar').addEventListener('submit', function (e) {
  e.preventDefault();
  let email = document.getElementById('logEmail').value;
  let pwd = document.getElementById('logPwd').value;

  let resultObject = search(email, pwd, bdUsers.data);
});

function inputHandler(masks, max, event) {
  var c = event.target;
  var v = c.value.replace(/\D/g, '');
  var m = c.value.length > max ? 1 : 0;
  VMasker(c).unMask();
  VMasker(c).maskPattern(masks[m]);
  c.value = VMasker.toPattern(v, masks[m]);
}

var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
var tel = document.querySelector('input[attrname=telephone1]');
VMasker(tel).maskPattern(telMask[0]);
tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);

var inputCPFMask = ['999.999.999-999', '99.999.999/9999-99'];
var inputCPF = document.querySelector('#inputCPF');
VMasker(inputCPF).maskPattern(inputCPFMask[0]);
inputCPF.addEventListener(
  'input',
  inputHandler.bind(undefined, inputCPFMask, 14),
  false
);
