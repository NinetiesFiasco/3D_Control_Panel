<template>
  <div class='cntrlContainer'>
    <div class='cntrlSign'>
      {{ signText }}
    </div>
    <div class='draggableControl' @mousedown='mousedownHnd'>
      <div class='begunok' ref='begunok' @dragstart='retFalse'></div>      
    </div>
    <div class='cntrlValue'>
      {{ currentValue }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DraggableControl',
  props: [
    'setValueHandler', // Обработчик (отрисовывает выбранное значение в сцене)
    'signText',        // Подпись слева от контрола
    'afterDot',        // Кол-во дробных знаков
    'maxValue',        // Максимальное значение
    'minValue',        // Минимальное значение
    'default'          // Значение при загрузке
    ],
  methods: {
    // Установка ширины указателя заполнения
    setBegunokWidth: function(width) {
      // Установка ширины
      this.$refs.begunok.style.width = width+'px'

      // Расчёт цифрового значения через пропорцию
      let drobSigns = Math.pow(10,this.afterDot)

      const proportion = width/this.totalWidth
      const minVal = parseFloat(this.minValue)
      const maxVal = parseFloat(this.maxValue)

      const val = Math.round((proportion*(maxVal-minVal)+minVal)*drobSigns)/drobSigns

      this.currentValue = val

      // Отрисовка установленного значения на сцене
      this.setValueHandler(val)
    },    
    // Заглушка для пользовательского drag'n'drop
    retFalse: function(){return false;},
    // Обработчик заполнения контрола по положению курсора мыши
    setBegunokPosition: function(e) {
      let x=e.clientX,
        right = this.left+this.totalWidth 

      // Ограничение слева
      if (x<this.left) x = this.left 
      // Ограничение справа
      if (x>right) x = right
      this.setBegunokWidth(x-this.left)
    },
    // При отпускании кнопки мыши убрать обработчики
    mouseUpHandler: function(){
      window.removeEventListener("mousemove",this.setBegunokPosition)
      window.removeEventListener("mouseup",this.mouseUpHandler)
    },
    // При нажатии на левую кнопку мыши в области
    mousedownHnd: function(e) {
      // Установить позицию нажатия
      this.setBegunokPosition(e)
      // Обработка движения
      window.addEventListener("mousemove",this.setBegunokPosition)
      window.addEventListener("mouseup",this.mouseUpHandler)
    }
  },
  data() {
    return {      
      totalWidth: 150,      // Общая ширина контрола
      currentValue: 0,      // Текущее значение (отличается от ширины контрола)
      left: 0,              // Позиция бегунка слева от !!края области видимости!!
    }
  },
  // При загрузке
  mounted() {
    // Получаем позицию контрола слева от !!края области видимости!!
    this.left = this.$refs.begunok.getBoundingClientRect().left
    // значение по умолчанию
    const def = parseFloat(this.default)
    // Расчитываем ширину на которую заполнится контрол
    const begunokWidth = def*this.totalWidth/this.maxValue
    // Установим эту ширину
    this.setBegunokWidth(begunokWidth)
  }
}
</script>

<style scoped>
.cntrlContainer {
  padding: 3px;
  border-bottom: 1px solid grey;
  text-align: left;
}
.cntrlContainer div{
  display: inline-block;
}
.draggableControl {
  position: relative;
  width: 150px;
  height: 25px;
  background: grey;
  cursor: ew-resize;
}
.begunok{
  position: absolute;
  top: 0px;
  left: 0px;
  background: yellow;
  height: 25px;
}
.cntrlSign{
  width: 80px;
}
.cntrlValue{
  width: 50px;
}
</style>