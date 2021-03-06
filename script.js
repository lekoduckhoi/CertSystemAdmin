
let selected = document.querySelector('.selected')
let cert = document.getElementById('certification')
let addcourse = document.getElementById('addcourse')
let cert_found = document.getElementById('cert__found')
let text_right = document.querySelector('.addcourse__text__right')
let text_wrong = document.querySelector('.addcourse__text__wrong')
$("#load").hide();
function transformx(i){
  selected.style.left = selected.style.left === '50%' ? '' :'50%'
  if(i===1){
    addcourse.classList.add('hidden')
    cert.classList.remove('hidden')
  }
  if(i===2){
    addcourse.classList.remove('hidden')
    cert.classList.add('hidden')
  }
}
let img = document.querySelector('.courseinfo__addimg__image')
let certiimg = document.getElementById('certiimg')
let text = document.querySelector('.courseinfo__addimg__text')
certiimg.onchange = (e)=>{
  const [file] = certiimg.files
  if(file){
    img.src = URL.createObjectURL(file)
    img.classList.remove('hidden')
    img.onload = function(){
      URL.revokeObjectURL(img.src)
    }
    //certiimg.classList.add('hidden')
    text.classList.add('hidden')
  }
}
let addcimg = document.querySelector('.addcourse__left__uploadbox__image')
let myFile = document.querySelector('#myFile')
let addtext = document.querySelector('.addcourse__left__uploadbox__text')
myFile.onchange = e => {
  const[filesadd] = myFile.files
  if(filesadd){
    addcimg.src = URL.createObjectURL(filesadd)
    addcimg.classList.remove('hidden')
    addcimg.onload = ()=> {
      URL.revokeObjectURL(addcimg.src)
    }
    addtext.classList.add('hidden')
  }
}

function add(n){
  for(var i=n-1;i>=0;i--){
  const course = document.createElement('div')
  course.classList.add('course')
  course.innerHTML =
  `<div class="course__image">
    <img id="image${i}" src="" alt="course image preview">
  </div>
  <div class="courseinfo">
    <h2 id="name${i}" class="courseinfo__name"></h2>
	  <p id="id${i}" class="courseinfo__id">Course Id: }</p>
  	<p id="date${i}" class="courseinfo__date">Date: </p>
  	<p id="issued${i}" class="courseinfo__issued">Issued by: Vietnam Institute for Advanced Study in Mathematics (VIASM)</p>
  	<p class="courseinfo__info">Course Information: <a id="info${i}" href=""></a></p>
  </div>
  <div class="course__button">
    <button onclick="gotoProgram(${i})" class="gotocert">Add</button>
  </div>`
  $("#courses").append(course)
}}

document.querySelector('.backtocourse').addEventListener('click',function(){
  $('.certblock').css('left','50%')
})

function gotoProgram(n) {
  $('.certblock').css('left','-50%')
  lay2con.methods.allPrograms(n).call((err,program) => {
		findByAddress = program.programContractAddress
    let lay3con = new web3.eth.Contract(lay3Abi, program.programContractAddress)
		$('.courseinfo__add__id').html("Id: " + n)
		lay3con.methods.date().call((err, _date) => {
			$('.courseinfo__add__date').html("Date: "+_date)
		})
		lay3con.methods.programName().call((err, _name) => {
			$('.courseinfo__add__name').html(_name)
		})
		lay3con.methods.link().call((err, _link) => {
			$('.courseinfo__add__info__a').html(_link)
		})
		lay3con.methods.programPic().call((err, _pic) => {
			$('.course__add__image__src').attr("src", "https://gateway.pinata.cloud/ipfs/"+_pic)
		})
    lay3con.methods.issuedBy().call((err, _issuedBy) => {
      $('.courseinfo__add__issued').html("Issued by: " + _issuedBy)
    })
	})
	setTimeout(function(){
		const backtv = document.querySelector('.backtocourse')
		backtv.scrollIntoView();
		const backtv1 = document.querySelector('body')
		backtv1.scrollIntoView();
	  },1500)
  
}

// SHA1 function
function SHA1(msg){function rotate_left(n,s){var t4=(n<<s)|(n>>>(32-s));return t4;};function lsb_hex(val){var str='';var i;var vh;var vl;for(i=0;i<=6;i+=2){vh=(val>>>(i*4+4))&0x0f;vl=(val>>>(i*4))&0x0f;str+=vh.toString(16)+vl.toString(16);}
return str;};function cvt_hex(val){var str='';var i;var v;for(i=7;i>=0;i--){v=(val>>>(i*4))&0x0f;str+=v.toString(16);}
return str;};function Utf8Encode(string){string=string.replace(/\r\n/g,'\n');var utftext='';for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;};var blockstart;var i,j;var W=new Array(80);var H0=0x67452301;var H1=0xEFCDAB89;var H2=0x98BADCFE;var H3=0x10325476;var H4=0xC3D2E1F0;var A,B,C,D,E;var temp;msg=Utf8Encode(msg);var msg_len=msg.length;var word_array=new Array();for(i=0;i<msg_len-3;i+=4){j=msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3);word_array.push(j);}
switch(msg_len % 4){case 0:i=0x080000000;break;case 1:i=msg.charCodeAt(msg_len-1)<<24|0x0800000;break;case 2:i=msg.charCodeAt(msg_len-2)<<24|msg.charCodeAt(msg_len-1)<<16|0x08000;break;case 3:i=msg.charCodeAt(msg_len-3)<<24|msg.charCodeAt(msg_len-2)<<16|msg.charCodeAt(msg_len-1)<<8|0x80;break;}
word_array.push(i);while((word_array.length % 16)!=14)word_array.push(0);word_array.push(msg_len>>>29);word_array.push((msg_len<<3)&0x0ffffffff);for(blockstart=0;blockstart<word_array.length;blockstart+=16){for(i=0;i<16;i++)W[i]=word_array[blockstart+i];for(i=16;i<=79;i++)W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){temp=(rotate_left(A,5)+((B&C)|(~B&D))+E+W[i]+0x5A827999)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=20;i<=39;i++){temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=40;i<=59;i++){temp=(rotate_left(A,5)+((B&C)|(B&D)|(C&D))+E+W[i]+0x8F1BBCDC)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
for(i=60;i<=79;i++){temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&0x0ffffffff;E=D;D=C;C=rotate_left(B,30);B=A;A=temp;}
H0=(H0+A)&0x0ffffffff;H1=(H1+B)&0x0ffffffff;H2=(H2+C)&0x0ffffffff;H3=(H3+D)&0x0ffffffff;H4=(H4+E)&0x0ffffffff;}
var temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4);return temp.toLowerCase();}
