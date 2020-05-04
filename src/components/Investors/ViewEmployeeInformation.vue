<template>
    <div>        
        <highcharts class="stock-chart" :constructor-type="'stockChart'" :options="stockOptions" :updateArgs="[true, false]" ref="highcharts"></highcharts>
    </div>
</template>
<script>
export default {    
    props: ['investor'],    
    data(){        
        return {                        
            stockOptions: {
                chart: {            
                    spacingTop: 5,
                    spacingBottom: 5,
                    spacingLeft: 5,
                    spacingRight: 5
                },                              
                rangeSelector: {
                    selected : 3,
                    Button:[{
                        type: 'ytd',
                        text: 'YTD', 
                        default: true                     
                    }]      
                },                                
                series: [{
                    data: []
                }]            
            }
        };
    },
    methods: {
        async load() {
            const series = this.$children[0].chart.series[0];                 
            const initialData = [];         
            const abc = [{y: 1, x: 1523998693000}, {y: 5 - 3, x: 1524002293000}, {y: 122, x: 1524005893000}, {y: 7, x: 1524088693000}, {y: 4,x: 1524175093000}, {y: 5, x: 1524261493000}]
            let length = 0;
            this.$store.dispatch('Projects/get').then(response => {
                for(var i = 0; i < response.data.length; i++){
                    var pid = response.data[i].id;
                    var pLength = response.data.length;                    
                    length++;                    
                    this.$store.dispatch('Investors/getProfit', pid).then(response => {    
                        var amountProfit = response.data[0].amount;                                
                        initialData.push({x: Date.parse(response.data[0].date), y: response.data[0].amount})                                 
                        if( length == pLength){                            
                            series.setData(initialData);
                        }                        
                    });                    
                }                
            })   
            //console.log(initialData);            
            //console.log(abc);
            //series.setData(abc);
            //series.setData([{y: amountProfit, x: 1523998693000}, {y: amountProfit - 3, x: 1524002293000}, {y: 122, x: 1524005893000}, {y: 7, x: 1524088693000}, {y: 4,x: 1524175093000}, {y: 5, x: 1524261493000}]);                                                                                                                        
        }        
    },
    mounted() {        
        this.load();        
    },
    destroyed(){
    }
};
</script>