/*--- ニフクラ mobile backend ---*/
const APPKEY = "ac62d88ed36c879e7a24c5e3e2af8eab4316242bf5aef4fc80ba683ff823cb37";
const CLIENTKEY = "ad4cd9a56a684ddb429b0835ece22233a145525b835cecb7f8f125f266c49470";

const ncmb = new NCMB(APPKEY, CLIENTKEY);
const SpotData = ncmb.DataStore("Spot");
/*------------------------------*/

/*--- index.html ---*/
function checkLogin(){
  //navigatorを作り、ログインセッションが残っているならapp.htmlへ
  //セッションがないならlogin.htmlへ
  const navigator = document.createElement("ons-navigator");
  navigator.id = "hatcaNavi";
  const user = ncmb.User.getCurrentUser();

  if (user) {
    console.log("ログイン中のユーザー: " + user.get("userName"));
    navigator.page = "app.html";
  } else {
    navigator.page = "login.html";
  }
  document.body.appendChild(navigator);
}

/*--- login.html ---*/
//ログインを行う
function userLogin(){
  //入力フォームからユーザー名とパスワードを取得
  const userName = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  console.log(userName);
  console.log(password);
  
  //ログインを実行したあとのコールバックを設定
  var callBack_Login = function(error, obj) {
      if (error) {
        //document.getElementsByClassName("error_msg").textContent("errorCode:" + error.code + ", errorMessage:" + error.message);
      } else {
        //メニュー画面に遷移
        document.getElementById('hatcaNavi').pushPage("app.html");
      }
  }

  //ログイン処理を実行し、上で設定されたコールバックが実行される
  ncmb.User.login(userName, password, callBack_Login);
}

/*--- signup.html ---*/
//会員登録を行う
function userSignup(){
  //入力フォームからユーザー名とパスワードを取得
  const userName = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  //ログインを実行したあとのコールバックを設定
  var callBack_Login = function(error, obj) {
      if (error) {
        //document.getElementsByClassName("error_msg").textContent("errorCode:" + error.code + ", errorMessage:" + error.message);
      } else {
        //メニュー画面に遷移
        document.getElementById('hatcaNavi').pushPage("app.html");
      }
  }
  
  //会員登録を実行したあとのコールバックを設定
  var callBack_Account = function(error, obj) {
      if (error) {
        //document.getElementsByClassName("error_msg").textContent("errorCode:" + error.code + ", errorMessage:" + error.message);
      } else {
          //ログインを実行
         ncmb.User.login(userName, password, callBack_Login);
      }
  }

  //会員のインスタンスを作成
  var user = new ncmb.User();
  var acl = new ncmb.Acl();
  //登録ユーザーに対するアクセス制御(読む、書き)
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(true);
  
  //ユーザー名とパスワードとスコアをインスタンスに設定
  user.set("userName", userName)
      .set("password", password)
      .set("acl", acl);//★ACLをセットするコード

  //会員登録を実行し、上で設定されたコールバックが実行される
  user.signUpByAccount(callBack_Account);
}


//ログアウトを実行し、ホーム画面に遷移させる
function logout(){
  ncmb.User.logout()
           .then(function(){
              // ログアウト後処理
              document.getElementById('hatcaNavi').resetToPage("login.html");
           })
           .catch(function(err){
              // エラー処理
              console.log("error:" + err.message);
              //未ログインの場合はログイン画面を表示
              document.getElementById('hatcaNavi').resetToPage("login.html");
           });
}

/*--- tab2.html ---*/
//現在地のアイコン
const image =
    //"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    "https://maps.google.com/mapfiles/ms/micons/man.png";

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    //初期位置を函館駅へ。位置情報無くても函館表示
    center: { lat: 41.773801703242306, lng: 140.72645299449846 },
    zoom: 14,
    mapTypeControl: false, //地図と航空写真を切り替えるボタンを非表示
    fullscreenControl: false, //マップを全画面モードで表示するボタンを非表示
    streetViewControl: false, //ストリートビューに切り替えるボタンを非表示
  });
  infoWindow = new google.maps.InfoWindow();


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          // 位置情報
          var latitude  = position.coords.latitude;//緯度
          var longitude = position.coords.longitude;//経度
          var latlng = new google.maps.LatLng( latitude , longitude ) ;

          //現在地マーカー表示
          const beachMarker = new google.maps.Marker( {
            map: map ,                             //表示するマップ 
            position: latlng ,                     //表示する位置
            //animation: google.maps.Animation.DROP, //現在地にアイコンが落ちてくるアニメーション
            icon: image,
        } ) ;
          infoWindow.open(map);
          map.setCenter(latlng);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  //});


}
//エラー時の処理
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(latlng);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;


/*--- tab3.html ---*/
/*--- XMLHttpsRequestオブジェクトを返す ---*/
function createXMLHttpRequest(category){ //category → ["Eat", "Kaimono", "Look", "Onsen", "Play"]
  const request = new XMLHttpRequest();
  request.open('GET', 'https://raw.githubusercontent.com/funswift/swift2022b-main/main/www/' + category + '.json', true);
  //↑JSONに（まだ）書き込まないのでGETで決め打ち
  request.responseType = 'json';
  request.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  request.send(null);
  //↑この3行は今のところ気にしなくていい

  /*--- コールバック関数の書き方 ---*/
  /*
  request.onreadystatechange = function(){
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){ ←通信がうまくいったらの処理
      ここに処理を書く
      this.responseでJSONオブジェクトを取得できる
    }
  }
  */
  return request;
}

function displayEatDataToList(){ //一覧画面に食べるカテゴリ表示
  const eatDataRequest = createXMLHttpRequest("Eat");
  eatDataRequest.onreadystatechange = function() {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
      //console.log(this.response);
      const eatData = this.response;
      
      for(let i=0; eatData.length>i; i++){
        const eatCard = document.createElement("div");
        eatCard.className = "list-card";
        eatCard.style = "background-color: #ffca80cc";
        
        const cardTop = document.createElement("div");
        cardTop.className = "list-card-top"

        const cardIcon = document.createElement("img");
        cardIcon.src = "./image/icon/Eat.png";
        cardIcon.alt = "食べるアイコン";

        const cardName = document.createElement("p");
        cardName.textContent = eatData[i].名称;

        cardTop.appendChild(cardIcon);
        cardTop.appendChild(cardName);

        const cardImage = document.createElement("div");
        cardImage.className = "instead-of-image";

        eatCard.appendChild(cardTop);
        eatCard.appendChild(cardImage);
        
        document.getElementById("list-container").appendChild(eatCard);

        /*
        <div id="list-container">
          <div class="list-card" style="background-color: #ffca80CC;">
            <div class="list-card-top">
                <img src="./image/Eat.png">
                <p>店名</p>
            </div>
            <div class="instead-of-image">
            </div>
          </div>
        </div>*/
      }
    }
  }
}

function displayLookDataToList(){ //一覧画面に見るカテゴリ表示
  const eatDataRequest = createXMLHttpRequest("Look");
  eatDataRequest.onreadystatechange = function() {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
      //console.log(this.response);
      const lookData = this.response;
      
      for(let i=0; lookData.length>i; i++){
        const lookCard = document.createElement("div");
        lookCard.className = "list-card";
        lookCard.style = "background-color: #bfe4ffcc";
        
        const cardTop = document.createElement("div");
        cardTop.className = "list-card-top"

        const cardIcon = document.createElement("img");
        cardIcon.src = "./image/icon/Look.png";
        cardIcon.alt = "見るアイコン";

        const cardName = document.createElement("p");
        cardName.textContent = lookData[i].名称;

        cardTop.appendChild(cardIcon);
        cardTop.appendChild(cardName);

        const cardImage = document.createElement("div");
        cardImage.className = "instead-of-image";

        lookCard.appendChild(cardTop);
        lookCard.appendChild(cardImage);
        
        document.getElementById("list-container").appendChild(lookCard);
      }
    }
  }
}

function displayPlayDataToList(){ //一覧画面に遊ぶカテゴリ表示
  const eatDataRequest = createXMLHttpRequest("Play");
  eatDataRequest.onreadystatechange = function() {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
      //console.log(this.response);
      const playData = this.response;
      
      for(let i=0; playData.length>i; i++){
        const playCard = document.createElement("div");
        playCard.className = "list-card";
        playCard.style = "background-color: #d8f255cc";
        
        const cardTop = document.createElement("div");
        cardTop.className = "list-card-top"

        const cardIcon = document.createElement("img");
        cardIcon.src = "./image/icon/Play.png";
        cardIcon.alt = "遊ぶアイコン";

        const cardName = document.createElement("p");
        cardName.textContent = playData[i].名称;

        cardTop.appendChild(cardIcon);
        cardTop.appendChild(cardName);

        const cardImage = document.createElement("div");
        cardImage.className = "instead-of-image";

        playCard.appendChild(cardTop);
        playCard.appendChild(cardImage);
        
        document.getElementById("list-container").appendChild(playCard);
      }
    }
  }
}

function displayOnsenDataToList(){ //一覧画面に温泉カテゴリ表示
  const eatDataRequest = createXMLHttpRequest("Play");
  eatDataRequest.onreadystatechange = function() {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
      //console.log(this.response);
      const onsenData = this.response;
      
      for(let i=0; onsenData.length>i; i++){
        const onsenCard = document.createElement("div");
        onsenCard.className = "list-card";
        onsenCard.style = "background-color: #77d9a8cc";
        
        const cardTop = document.createElement("div");
        cardTop.className = "list-card-top"

        const cardIcon = document.createElement("img");
        cardIcon.src = "./image/icon/Onsen.png";
        cardIcon.alt = "温泉アイコン";

        const cardName = document.createElement("p");
        cardName.textContent = onsenData[i].名称;

        cardTop.appendChild(cardIcon);
        cardTop.appendChild(cardName);

        const cardImage = document.createElement("div");
        cardImage.className = "instead-of-image";

        onsenCard.appendChild(cardTop);
        onsenCard.appendChild(cardImage);
        
        document.getElementById("list-container").appendChild(onsenCard);
      }
    }
  }
}

function displayKaimonoDataToList(){ //一覧画面に買い物カテゴリ表示
  const eatDataRequest = createXMLHttpRequest("Play");
  eatDataRequest.onreadystatechange = function() {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
      //console.log(this.response);
      const kaimonoData = this.response;
      
      for(let i=0; kaimonoData.length>i; i++){
        const kaimonoCard = document.createElement("div");
        kaimonoCard.className = "list-card";
        kaimonoCard.style = "background-color: #ffcabfcc";
        
        const cardTop = document.createElement("div");
        cardTop.className = "list-card-top"

        const cardIcon = document.createElement("img");
        cardIcon.src = "./image/icon/Kaimono.png";
        cardIcon.alt = "買い物アイコン";

        const cardName = document.createElement("p");
        cardName.textContent = kaimonoData[i].名称;

        cardTop.appendChild(cardIcon);
        cardTop.appendChild(cardName);

        const cardImage = document.createElement("div");
        cardImage.className = "instead-of-image";

        kaimonoCard.appendChild(cardTop);
        kaimonoCard.appendChild(cardImage);
        
        document.getElementById("list-container").appendChild(kaimonoCard);
      }
    }
  }
}

function getSpotData() {
  const data = SpotData.limit(10).fetchAll()
    .then(function(results){
      for(let i=0; i<results.length; i++){
        console.log(results[i].name);
      }
    })
    .catch(function(err){
      console.log(err);
    });
}

function displaySpotVisted() {
  const data = SpotData.limit(10).fetchAll()
                        .then(function(results){
                          for(let i=0; i<results.length; i++){
                            console.log(results[i].name);
                          }
                        })
                        .catch(function(err){
                          console.log(err);
                        });

  /*
  SpotVistedData.equalTo("userName", user.get("userName")).fetchAll()
                .then(function(results){
                  console.log(results);
                  dataList.push(results);
                })
                .catch(function(err){
                  console.log(err)
                  errorMassage = err;
                });*/
}

/*--- tab4.html ---*/
function testDisplayUserInfo(){
  const user = ncmb.User.getCurrentUser();
  if(user){
    const testP = document.createElement("p");
    testP.textContent = "ユーザー名：" + user.get("userName");
    document.getElementById("user-info").appendChild(testP);
  }
}