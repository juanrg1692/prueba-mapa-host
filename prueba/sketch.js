

var mapImg;
var zoom = 12;

var clon = -98.20193;
var clat = 19.04334;
//-98.20193,19.04334 puebla

//19.031396, -98.241804  //ibero puebla
//19.035142, -98.244309  //hospital del niño poblano
//19.040559, -98.213572  //hospital universitario

var lon = -98.241804;
var lat = 19.031396;

var lon0 = -98.244309;
var lat0 = 19.035142;

var lon1 = -98.213572;
var lat1 = 19.040559;


var ww = 1024;
var hh = 512;

function preload(){
  mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/' +
      clon +
      ',' +
      clat +
      ',' +
      zoom +
      '/' +
      ww +
      'x' +
      hh +
      '?access_token=pk.eyJ1IjoianVhbnJnOTIiLCJhIjoiY2s4OTVnMHZvMDNobDNscXhhZzhnc3UzZyJ9.kcu8-eSoglMzTlcdf5ymBg');
}


function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(ww,hh);
}

function draw(){

translate(width/2,height/2);
imageMode(CENTER);
image(mapImg,0,0);

var cx = mercX(clon);
var cy = mercY(clat);

var x = mercX(lon) - cx;
var y = mercY(lat) - cy;


var x0 = mercX(lon0) - cx;
var y0 = mercY(lat0) - cy;

var x1 = mercX(lon1) - cx;
var y1 = mercY(lat1) - cy;


var sz = 10;

stroke(0);
fill(255,0,0);
ellipse(x,y,sz,sz);
ellipse(x0,y0,sz,sz);
ellipse(x1,y1,sz,sz);

var d = dist(x,y,mouseX-width/2,mouseY-height/2);
var d0 = dist(x0,y0,mouseX-width/2,mouseY-height/2);
var d1 = dist(x1,y1,mouseX-width/2,mouseY-height/2);

if(d <= sz){
  fill(0);
  textSize(sz*2);
  textAlign(CENTER,CENTER);
  text("IberoPuebla",x,y-sz);
}
if(d0 <= sz){
  fill(0);
  textSize(sz*2);
  textAlign(CENTER,CENTER);
  text("Hospital del niño poblano",x0,y0-sz);
}
if(d1 <= sz){
  fill(0);
  textSize(sz*2);
  textAlign(CENTER,CENTER);
  text("Hospital universitario",x1,y1-sz);
}


}
