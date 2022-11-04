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