<!--  -->
<template>
  <div id="mapDiv">
    tianditu
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup(){

  },
  data() {
    return {
      map: null,
      zoom: 17,
    }
  },
  mounted() {
    var vue = this
    //初始化地图对象
    this.map = new T.Map("mapDiv");
    //设置显示地图的中心点和级别
    this.map.centerAndZoom(new T.LngLat(120.440158, 30.841243), this.zoom);

    var definedOverlay = T.Overlay.extend({
      initialize: function (lnglat, text, text2, options) {
        this.lnglat = lnglat;
        this.setOptions(options);
        this._text = text;
        this._overText = text2;
      },

      onAdd: function (map) {
        this.map = map;
        var div = this._div = document.createElement("div");
        div.style.position = "absolute";
        div.style.backgroundColor = "#EE5D5B";
        div.style.border = "1px solid #BC3B3A";
        div.style.color = "white";
        div.style.height = "18px";
        div.style.padding = "2px";
        div.style.lineHeight = "18px";
        div.style.whiteSpace = "nowrap";
        div.style.MozUserSelect = "none";
        div.style.fontSize = "12px";
        var span = this._span = document.createElement("span");
        div.appendChild(span);
        span.appendChild(document.createTextNode(this._text));
        var that = this;

        var arrow = this._arrow = document.createElement("div");
        arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
        arrow.style.position = "absolute";
        arrow.style.width = "11px";
        arrow.style.height = "10px";
        arrow.style.top = "22px";
        arrow.style.left = "10px";
        arrow.style.overflow = "hidden";
        div.appendChild(arrow);

        div.onclick = function(){
          vue.toCity();
        },
        div.onmouseover = function () {
          this.style.backgroundColor = "#6BADCA";
          this.style.borderColor = "#0000ff";
          this.getElementsByTagName("span")[0].innerHTML = that._overText;
          arrow.style.backgroundPosition = "0px -20px";
        }
        div.onmouseout = function () {
          this.style.backgroundColor = "#EE5D5B";
          this.style.borderColor = "#BC3B3A";
          this.getElementsByTagName("span")[0].innerHTML = that._text;
          arrow.style.backgroundPosition = "0px 0px";
        }

        this.map.getPanes().overlayPane.appendChild(this._div);
        this.update(this.lnglat);
      },

      onRemove: function () {
        var parent = this.div.parentNode;
        if (parent) {
          parent.removeChild(this.div);
          this.map = null;
          this.div = null;
        }
      },

      setLnglat: function (lnglat) {
        this.lnglat = lnglat;
        this.update();
      },
      getLnglat: function () {
        return this.lnglat;
      },
      setPos: function (pos) {
        this.lnglat = this.map.layerPointToLngLat(pos);
        this.update();
      },
      /**
       * 更新位置
       */
      update: function () {
        var pos = this.map.lngLatToLayerPoint(this.lnglat);
        this._div.style.top = (pos.y - 36) + "px";
        this._div.style.left = (pos.x - 11) + "px";

      }
    });

    var point = new T.LngLat(120.437058, 30.840283);
    var pdefinedOverlay = new definedOverlay(point, "浙江水利水电学院(南浔校区)为例", "点击查看", {});
    this.map.addOverLay(pdefinedOverlay);


  },
  methods: {
    toCity(){
      console.log(123)

      this.$router.push('/home')
    }
  }
}

</script>

<style scoped>
/* @import url(); 引入css类 */
#mapDiv {
  height: 100%;
  width: 100%;
}
</style>