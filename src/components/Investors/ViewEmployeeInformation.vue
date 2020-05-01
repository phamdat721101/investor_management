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
            var initialData ;
            this.$store.dispatch('Investors/getProfit', this.investor.projectId).then(response => {    
                var amountProfit = response.data[0].amount;
                series.setData([{y: amountProfit, x: 1523998693000}, {y: amountProfit - 3, x: 1524002293000}, {y: 122, x: 1524005893000}, {y: 7, x: 1524088693000}, {y: 4,x: 1524175093000}, {y: 5, x: 1524261493000}]);            
            });                                                                                                      
        }        
    },
    mounted() {        
        this.load();        
    },
    destroyed(){
    }
};
</script>