var i=0;

$.get("/table", function(data) {
  console.log(data);
  data.forEach(linha => {
  var x=i+1;
  var download = '<a style="color:#212529;" href=/download/'+data[i].ID+'><i class="fas fa-file-download" style="font-size:30px"></i></a>';
  //var download = '<i class="fa fa-download"></i>';
  $("#tab1 tr:last").after('<tr><th scope="row">'+x+'</th><td>'+data[i].ID+'</td><td>'+data[i].Assunto+'</td><td>'+data[i].Status+'</td><td>'+data[i].Criação+'</td><td>'+download+'</td></tr>');
    i++;
  })
});
