

function getMyPlace() {
    var output = document.getElementById("result");
    if (!navigator.geolocation){//Geolocation apiがサポートされていない場合
      output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
      return;
    }
    function success(position) {
      var latitude  = position.coords.latitude;//緯度
      var longitude = position.coords.longitude;//経度
      output.innerHTML = '<p>緯度 ' + latitude + '° <br>経度 ' + longitude + '°</p>';
      // 位置情報
      var latlng = new google.maps.LatLng( latitude , longitude ) ;
      // Google Mapsに書き出し
      var map = new google.maps.Map( document.getElementById( 'map' ) , {
          zoom: 15 ,// ズーム値
          center: latlng ,// 中心座標
      } ) ;
      // マーカーの新規出力
      new google.maps.Marker( {
          map: map ,
          position: latlng ,
      } ) ;
    };
    function error() {
      //エラーの場合
      output.innerHTML = "座標位置を取得できません";
    };
    navigator.geolocation.getCurrentPosition(success, error);//成功と失敗を判断
  }

  //Google map 表示
function initMap() {
	function success(pos) {
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		var latlng = new google.maps.LatLng(lat, lng); //中心の緯度, 経度
    
		var map = new google.maps.Map(document.getElementById('maps'), {
			zoom: 17,
			center: latlng,
      mapTypeControl: false,
      streetViewControl: false, //ストリートビューに切り替えるボタンを非表示
		});
		var marker = new google.maps.Marker({
			position: latlng, //マーカーの位置（必須）
			map: map //マーカーを表示する地図
		});
	}
	function fail(error) {
		alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
		var latlng = new google.maps.LatLng(35.6812405, 139.7649361); //東京駅
		var map = new google.maps.Map(document.getElementById('maps'), {
			zoom: 10,
			center: latlng,
      mapTypeControl: false,
		});
	}
	navigator.geolocation.getCurrentPosition(success, fail);
}
