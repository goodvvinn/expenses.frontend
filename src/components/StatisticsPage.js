import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { getExpensesPerCategory } from '../services/statistics';
import { useEffect, useState, useRef } from 'react'

function useIsMountedRef(){
    const isMountedRef = useRef(null);
    useEffect(() => {
      isMountedRef.current = true;
      return () => isMountedRef.current = false;
    });
    return isMountedRef;
  }

const StatisticsPage = () => {
    const isMountedRef = useIsMountedRef();
    const dispatch = useDispatch();
    const expenseAmountPerCategory = useSelector(state => state.statisticsSlice.expenseAmountPerCategory);
    const [doughnut, setDoughnut] = useState({
        labels: [],
        data: [],
    });

    useEffect(() => {
        if(isMountedRef.current){
            var expense = getExpensesPerCategory(dispatch);
            console.log(expense);
        }
        else{
            console.log('Error!')}
    }, [isMountedRef]);

    useEffect(() => {
        if(isMountedRef.current){
            console.log(isMountedRef.current)
        var expenseWithDoughnut = setDoughnut({
                labels: expenseAmountPerCategory.map(x => x.key),
                data: expenseAmountPerCategory.map(x => x.value),
                
            });
            console.log(expenseWithDoughnut);}
            else{
                console.log('Error!')}
    }, [expenseAmountPerCategory, isMountedRef]);

    

    const data = {
        labels: doughnut.labels,
        datasets: [{
            data: doughnut.data,
            backgroundColor: [
                '#007bff', // blue
                '#FF0000', // red
                '#FFD700', // yellow
                '#28a745', // green
                '#FF00FF', // violet
                '#ff9900', // orange
                '#00FFFF', // aqua marine
                '#d69ae5', // red violet
                '#FF8F66', // orange red
                '#00FF00', // lime
            ]
        }]
    };

    return <div hidden={!expenseAmountPerCategory || !expenseAmountPerCategory.length}
        style={{ maxWidth: '35rem', maxHeight: '35rem', margin: 'auto', textAlign: 'center' }}>
        <h4 style={{ marginTop: '10px' }}> Expenses per Category</h4>
        <Doughnut data={data} />
    </div>
};

export default StatisticsPage;