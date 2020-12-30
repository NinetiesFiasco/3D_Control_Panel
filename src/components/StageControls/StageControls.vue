<template>
  <div id='StageControls' class='unselectable'>
    <div v-if="display">
      <div v-show='!displayColorPicker'>
        <div class='colorPickerOpener' @click="displayColorPicker=true">
          <div class='colorPickerSign'>light color</div>
          <div ref='colorShow' class='colorShow'>{{choosedColor}}</div>
        </div>
        <DraggableControl afterDot='1' minValue='0' maxValue='2'    default='1'     v-bind:setValueHandler='setIntencity' signText='intencity' />
        <DraggableControl afterDot='0' minValue='0' maxValue='200'  default='200'   v-bind:setValueHandler='setDistance' signText='distance' />
        <DraggableControl afterDot='2' minValue='0' maxValue='1.05' default='0.79'  v-bind:setValueHandler='setAngle' signText='angle' />
        <DraggableControl afterDot='1' minValue='0' maxValue='1'    default='0.1'   v-bind:setValueHandler='setPenumbra' signText='penumbra' />
        <DraggableControl afterDot='1' minValue='1' maxValue='2'    default='2'     v-bind:setValueHandler='setDecay' signText='decay' />
        <DraggableControl afterDot='1' minValue='0' maxValue='1'    default='1'     v-bind:setValueHandler='setFocus' signText='focus' />
      </div>
      <div v-show="displayColorPicker" class='colorPicker'>
        <ColorPicker color="#ffffff" @color-change="updateColor" :visible-formats="['hex']" />
        <div class='colorPickerCloser' @click="displayColorPicker=false">Close color picker</div>
      </div>
    </div>
    <div class='openers'>
      <div v-if="display" @click="display=false">Close Controls</div>
      <div v-else @click="display=true">Open Controls</div>
    </div>
  </div>
</template>

<script>
import DraggableControl from './Lines/DraggableControl.vue'
import { ColorPicker } from 'vue-accessible-color-picker'

export default {
  name: 'StageControls',
  components: {
    DraggableControl,ColorPicker
  },
  data(){
    return {
      display: true,              // Отобразить панель контролов
      displayColorPicker: false,  // Отобразить выбор цветов
      choosedColor: '#ffffff'     // Цвет отображаемый по умолчанию
    }
  },  
  mounted: function(){
    // При загрузке контрола показать цвет
    this.$refs.colorShow.style.background = this.choosedColor
  },
  methods: {
    setIntencity: function(value) {
      window.spotLight.intensity = value;
      window.render();
    },
    setDistance: function(value) {
      window.spotLight.distance = value;
      window.render();      
    },
    setAngle: function(value) {
      window.spotLight.angle = value;
      window.render();      
    },
    setPenumbra: function(value) {
      window.spotLight.penumbra = value;
      window.render();      
    },
    setDecay: function(value) {
      window.spotLight.decay = value;
      window.render();      
    },
    setFocus: function(value) {
      window.spotLight.shadow.focus = value;
      window.render();      
    },  
    updateColor: function (data) {
      const color = '0x'+data.colors.hex.replace('#','').substring(0,6)
      window.spotLight.color.setHex(color);
      window.render();      
      this.choosedColor = data.colors.hex
      this.$refs.colorShow.style.background = this.choosedColor
      const rgb = data.colors.rgb;
      this.$refs.colorShow.style.color = rgb.r+rgb.g+rgb.b > 1.4
        ? 'black'
        : 'white'
    }
  }  
}
</script>

<style scoped>
#StageControls {
  width: 300px;
  outline: 1px solid black;
  position: relative;
  padding: 5px;
  color: white;
}
.openers {
  cursor: pointer;
  padding: 10px;
}
#StageControls .colorPicker{
  position: absolute;
  color: black;
  z-index: 100;
  top: 0px;
  left: 0px;
  width: 100%;
}
.colorPickerOpener {
  text-align: left;
  cursor: pointer;
}
.colorPickerSign {
  display: inline-block;
  cursor: pointer;
  width: 85px;
}
.colorPickerCloser {
  background: grey;
  cursor: pointer;
  padding: 7px;
}
.colorShow{
  display: inline-block;
  width: 80px;
  padding: 3px 15px;
  margin-left: 15px;
  text-align: center;
}
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>