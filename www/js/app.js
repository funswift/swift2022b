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