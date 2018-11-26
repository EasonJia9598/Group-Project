/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global RGraph, cvs */



window.onload = function drawGraph()
    {
        var data     = [20,13.43,2.83,4.24,7.42,13.43,38.65];
        var labels   = ['pizza','jam','french fries','steak','broccoli','salad','tea'];
        
        for (var i=0; i<data.length; ++i) {
            labels[i] = labels[i] + ', ' + data[i] + '%';
        }

        var pie = new RGraph.Pie({
            id: 'cvs',
            data: data,
            options: {
                labels: labels,
                labelsSticksList: true,
                tooltips: labels,
                colors: ['#EC0033','#A0D300','#FFCD00','#00B869','#999999','#FF7300','#004CB0'],
                strokestyle: 'white',
                linewidth: 0,
                shadowOffsetx: 2,
                shadowOffsety: 2,
                shadowBlur: 3,
                exploded: 7,
                textAccessible: true
            }
        }).draw();
    };
    
    function changedata()
    {
        RGraph.reset(cvs); 
        //var c=document.getElementById("cvs");
        //var context = c.getContext('2d');
        //context.clearRect(0, 0, cvs.width, cvs.height);
         var data     = [10,13.43,2.83,4.24,7.42,13.43,48.65];
        var labels   = ['pizza','cola','french fries','steak','broccoli','salad','tea'];
        
        for (var i=0; i<data.length; ++i) {
            labels[i] = labels[i] + ', ' + data[i] + '%';
        }

        var pie = new RGraph.Pie({
            id: 'cvs',
            data: data,
            options: {
                labels: labels,
                labelsSticksList: true,
                tooltips: labels,
                colors: ['#EC0033','#A0D300','#FFCD00','#00B869','#999999','#FF7300','#004CB0'],
                strokestyle: 'white',
                linewidth: 0,
                shadowOffsetx: 2,
                shadowOffsety: 2,
                shadowBlur: 3,
                exploded: 7,
                textAccessible: true
            }
        }).draw();
        
    }