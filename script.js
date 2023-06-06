//untuk menjalankan APInya Gunakan XAMPP Karena API tidak dapat direquest dengan host webrowser standar
getberita();

function getberita(){

 let timerInterval
 Swal.fire({
  title: 'Sedang Mencari...',
  html: 'Akan menemukan hasil dalam <b></b> detik.',
  timer: 1000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('Selesai')
  }
})

$(".posts").text("");
var cari = $("#cari").val();

if (cari==''){
  cari="everything";
}

var url = "https://newsapi.org/v2/everything?q="+cari+"&apiKey=c2120c8166354081810052127065e25f";

$("#load").show();

//jQuery AJAX Method GET
$.get(url,(response)=>{

 $("#load").hide();

 console.log(response.articles);

 if (response.articles==''){
   Swal.fire({
    icon: 'error',
    title: 'Not Found',
    text: "Tidak Menemukan Hasil"
  });
 }

 for(i=0;i<response.articles.length;i++){
  var html = `<div class="card m-3 shadow" data-aos="fade-down" data-aos-delay="150">
  <div class="row g-0">
  <div class="col-md-4">
  <img src="${response.articles[i].urlToImage}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
  <div class="card-body">
  <h5 class="card-title">${response.articles[i].title}</h5>
  <p class="card-text">${response.articles[i].content}</p>
  <p class="card-text"><small class="text-muted">Terakhir diupdate ${response.articles[i].publishedAt} | ${response.articles[i].source.name}</small></p>
  <a href="${response.articles[i].url}" target="_blank" class="btn btn-secondary">Lanjut Baca</a>
  <p></p>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>`;

  $(".posts").append(html);
}

});

}

AOS.init({
  duration: 800,
  offset:150,
});

