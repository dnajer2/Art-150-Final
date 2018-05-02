var button;

var img=[];
var sound=[];
var pg=2;

var cap;
var loc;
var des;

function preload() {

  /** Load all text files **/
  cap = loadStrings('assets/cv.txt');
  loc = loadStrings('assets/locations.txt');
  des = loadStrings('assets/desc.txt');

  /** Load all images **/

  for (var i = 0; i< 48; i++) {
    img[i] = loadImage("assets/a" + i + ".jpg");
  }
}

function setup() {
 // createCanvas(windowWidth, windowHeight);
    createCanvas(1366, 768);

  background(0);
  fill(255);
  textSize(46);
  text("April in 2018", width/2, height/2);


  //set sound format
  soundFormats('mp3');


  // Load all sounds here. Tried to make the sound positions the same as the image positions for easy calling 
  sound[2] = loadSound('assets/Sound/b2.mp3');
  for (var j = 4; j< 11; j++) {
    sound[j] = loadSound('assets/Sound/b'+j+'.mp3');
  }
  sound[12] = loadSound('assets/Sound/b12.mp3');
  for (var j = 15; j< 18; j++) {
    sound[j] = loadSound('assets/Sound/b'+j+'.mp3');
  }
  sound[19] = loadSound('assets/Sound/b19.mp3');
  sound[25] = loadSound('assets/Sound/b25.mp3');
  sound[38] = loadSound('assets/Sound/b38.mp3');
  sound[39] = loadSound('assets/Sound/b39.mp3');
  sound[40] = loadSound('assets/Sound/b40.mp3');
  /**********************************************************/


  /** All the navigational buttons were made here **/
  //audio play
  mButton=createButton("play");
  mButton.mousePressed(playA);
  mButton.position(40, 40);

  //previous image
  button4 = createButton("<< Previous");
  button4.position(width/4, 600);
  button4.mousePressed(prevPg);

  //home image
  button2 = createButton("Home  ");
  button2.position(2*width/4, 600);
  button2.mousePressed(homePg);

  //next image
  button3 = createButton(" Next   >> ");
  button3.position(3*width/4, 600);
  button3.mousePressed(nextPg);


  //random image
  button5 = createButton("Random");
  button5.position(40, 80);
  button5.mousePressed(randPg);


  // image(img[0], 0, 0, width/8, height/6);
  //jump to home
  homePg();
}

/*Function to allow play of audio file associated with image*/
function playA() {

  //Allows ability to start and stop audio clip
  if (sound[pg] != null) {
    if (!sound[pg].isPlaying()) {
      sound[pg].play();
      song.setVolume(0.8);
      mButton.html("pause!");
    } else {
      sound[pg].pause();
      mButton.html("play!");
    }
  } else {
    mButton.html("Not Available"); //To tell user there is no sound clip for this image
  }
}

//Uodate the image and descriptons here!
function newPage() {
  if (sound[pg] != null) {
    mButton.html("Play");
  } else {
    mButton.html("Not Available");
  }

  background(0);
  //most of the images are in landscape mode, so resize(width/2, 0) works well, but for the portrait images,
  //you need to use resize(0, height/2 so that it will fit)
  if (pg==5 || pg==7 || pg==12 || pg==20 || pg==21 || pg==29 || pg==33|| pg==40) {  
    img[pg].resize(0, height/2);
  } else {
    img[pg].resize(width/2, 0);
  }
  image(img[pg], width/15, height/4.5);

  fill(255);


  //Write description paragraph here
  textSize(16);
  textFont('Calibri');
  textStyle(NORMAL);
  text(des[pg], 2.5* width/4, height/3, width/3, height);

  //Write CV detection line here
  textSize(16);
  textFont('Courier New');
  textStyle(ITALIC);
  text("Computer vision detection: " + cap[pg], width/15, 6.5*height/8, width/2, height/2);

  //Write location image here
  textSize(16);
  textFont('Calibri');
  textStyle(NORMAL);
  text(loc[pg], width/15, 1.5*height/8, width/2, height/2);
}

/***********************************************************************************
 Had a lot of trouble passing a method with parameters inside button.mousePressed(),
 so instead of easily updating the page counter in newPage(); I had to make
 seperate functions to a advance/rewind the counter.
 ************************************************************************************/
function homePg() {
  background(0);

  //if (sound[pg].isPlaying()) {
  //  sound[pg].stop();
  //}
  textSize(42);
  text("April in 2018", width/2, height/2);
  pg=1;
}

function nextPg() {
  //if (sound[pg].isPlaying()) {
  //  sound[pg].stop();
  //}


  background(0);
  if (pg != img.length-1) //advance page. If you're on the last page, stay on the last page 
    pg++;

  newPage();
}

function prevPg() {
  //if (sound[pg].isPlaying()) {
  //  sound[pg].stop();
  //}


  background(0);


  if (pg != 2) { //rewind page. If you're on the first page, stay on the first page
    pg--;
  }
  newPage();
}

function randPg() { 

  //if (sound[pg].isPlaying()) {
  //  sound[pg].stop();
  //}

  background(0);
  pg=Math.floor(random(2, img.length)); //pick a random page
  newPage();
}
