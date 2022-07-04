var db = JSON.parse(localStorage.getItem('users'));
var user = JSON.parse(localStorage.getItem('user'));
var historico = JSON.parse(localStorage.getItem('historico'));

user = db.data.filter((item) => {
  return item.id === user.id;
});

if (user[0].ocupacao === 'profissional') {
  db = db.data.filter((item) => {
    return item.ocupacao !== 'profissional' && item.id !== user[0].id;
  });
} else {
  db = db.data.filter((item) => {
    return item.ocupacao === 'profissional' && item.id != user[0].id;
  });
}

const data = () => {
  const today = new Date();

  function formatDate(date, format) {
    const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      aa: date.getFullYear().toString().slice(-2),
      aaaa: date.getFullYear(),
    };

    return format.replace(/mm|dd|aa|aaaa/gi, (matched) => map[matched]);
  }

  return formatDate(today, 'mm/dd/aa');
};
