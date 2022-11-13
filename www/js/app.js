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

function displayEatDataToList(){ //一覧画面にEat.jsonを表示する関すにする予定 確認にとりあえずデータを表示してみてる
  const eatDataRequest = createXMLHttpRequest("Eat");
  eatDataRequest.onreadystatechange = function() {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
      //console.log(this.response);
      const eatData = this.response;
      document.getElementById("name").lastElementChild.textContent = eatData[0].名称;
      document.getElementById("hurigana").lastElementChild.textContent = eatData[0].ふりがな;
      document.getElementById("category").lastElementChild.textContent = eatData[0].カテゴリ;
      document.getElementById("area").lastElementChild.textContent = eatData[0].エリア;
    }
  }
}