<template>
    <div>        
        <highcharts class="stock-chart" :constructor-type="'stockChart'" :options="stockOptions" :updateArgs="[true, false]" ref="highcharts"></highcharts>
    </div>
</template>
<script>
export default {
    props: ['options'],    
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
                    buttons: [{
                        type: 'month',
                        count: 1,
                        text: '1m',
                        events: {
                            click: function() {
                                alert('licked button');
                            }
                        }
                    },{
                        type: 'month',
                        count: 3,
                        text: '3m'
                    },{
                        type: 'all',
                        text: 'All'
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
            const initialData = [1,2,3,4,5,6,7,8,9,10,21,4,6,7,2,0.2];            
            series.setData(initialData);            
        }
    },
    mounted() {
        this.load();
    },
    destroyed(){

    }
};
</script>