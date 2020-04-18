var i=0;

$.get("/table", function(data) {
  console.log(data);
  data.forEach(linha => {
  var x=i+1;
  $("#tab1 tr:last").after('<tr><th scope="row">'+x+'</th><td>'+data[i].ID+'</td><td>'+data[i].Assunto+'</td><td>'+data[i].Status+'</td><td>'+data[i].Criação+'</td></tr>');
    i++;
  })
});
