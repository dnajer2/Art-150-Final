var button;

var img=[];
var bg;
var sound=[];
var pg=2;
var locationBreakdown;

var cap;
var loc;
var des;

function preload() {

  var url =  "https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&url=https%3A%2F%2Fpastebin.com%2FRe03HnsN&features=concepts%2Cemotion%2Csentiment&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.mentions=false&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true";  //Change the api key to your api key from openweathermap.org
  httpGet(url, 'json', false, function(response) {
    locationBreakdown = response;
  }
  );



  /** Load all text files **/
  cap = loadStrings('assets/cv.txt');
  loc = loadStrings('assets/locations.txt');
  des = loadStrings('assets/desc.txt');

  /** Load all images **/

  for (var i = 0; i< 48; i++) {
    img[i] = loadImage("assets/a" + i + ".jpg");
  }

  bg = loadImage("assets/x1.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);
  textSize(56);
  text("April in 2018", width/4, height/2);


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
  bg.resize(width/3, 0);
  image(bg, 30+80, 35+ 90);
  //most of the images are in landscape mode, so resize(width/2, 0) works well, but for the portrait images,
  //you need to use resize(0, height/2 so that it will fit)
  if (pg==5 || pg==7 || pg==12 || pg==20 || pg==21 || pg==29 || pg==33|| pg==40) {  

    img[pg].resize(0, height/3);
    image(img[pg], 30+ 3*width/15, 50+height/4.5);
  } else {
    img[pg].resize(width/3, 0);
    image(img[pg], 30+ width/15, 40+height/4.5);
  }

  fill(255);


  //Write description paragraph here
  textSize(16);
  textFont('Calibri');
  textStyle(NORMAL);
  text(des[pg], 2* width/4, 15+height/3, width/3, height);

  //Write CV detection line here
  textSize(16);
  textFont('Courier New');
  textStyle(ITALIC);
  text("Computer vision detection: " + cap[pg], width/15, 6.5*height/8, width/2, height/2);

  //Write location image here
  textSize(16);
  textFont('Calibri');
  // textStyle(NORMAL);
  //text(loc[pg], width/15, 1.5*height/8, width/2, height/2);
  text(loc[pg], 2* width/4, height/4, width/3, height);
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
  //textSize(56);
  //text("April in 2018", width/4, height/2);
  
  fill(255);
    textSize(38);
  text("********OFFICIAL LOCATION POWER RANKINGS********", width/8, height/8);
  textSize(24);
  text("#1. "+locationBreakdown.concepts[0].text + "    relevance: "+ locationBreakdown.concepts[0].relevance, width/4, 2*height/8);
  text("#2. "+locationBreakdown.concepts[1].text+ "    relevance: "+ locationBreakdown.concepts[1].relevance, width/4, 3*height/8);
  text("#3. "+locationBreakdown.concepts[2].text+ "    relevance: "+ locationBreakdown.concepts[2].relevance, width/4, 4*height/8);
  text("********POWER GAP********", width/4, 5*height/8);
  text("#6. "+locationBreakdown.concepts[7].text+ "    relevance: "+ locationBreakdown.concepts[7].relevance, width/4, 6*height/8);

  textSize(16);
//  text("Sentimental experience detected : "+locationBreakdown.sentiment.document.label + " Probability: "locationBreakdown.sentiment.document.score, width/4, 7*height/8);
  text("Emotions calculated:{ / sadness ("+locationBreakdown.emotion.document.emotion.sadness + ") / joy ("+locationBreakdown.emotion.document.emotion.joy+") / fear (" + locationBreakdown.emotion.document.emotion.fear + ") / disgust ("+ locationBreakdown.emotion.document.emotion.disgust + ") / fear ("+ locationBreakdown.emotion.document.emotion.fear + ") }", width/8, height-40);

  
  
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
