/*
* Created and tested by Md. Riad Arifin of GeniusHub Group
* Story 
* As a developer, I want to write a code which will help to redraw the pie chart when new data is entered or existing data is altered.
* Created by Md. Riad Arifin: Index# 36
* Complexity # 5
* Individual Credit: Md. Riad Arifin created, wrote and tested the source code.
* Pseudocode/Tasks
* 1.	Create a javascript file.
* 2.	Transfer the javascript code in HTML which draws the pie chart to this new script file
* 3.	Make a new function which will redraw the graph with its new data
* Individual Credit: Given/When/Then
* When new data about the preferences of the food is entered into the app by the residents it will combine with the old data and redraw the pie chart to show the new percentage of people liking certain foods.
*/

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
