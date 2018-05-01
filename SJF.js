var p = []; //processes
var N; //number of proccesses

var totalTime;
var chart = [];

module.exports = {
    startProcessing: function(p, callback){
        //initialize
        totalTime = 0;
        N = p.length - 1;
        //get total time
        for(i=1;i<N;i++){
            totalTime += p[i][0] + p[i][1];
        }
        //find min
        for(i=0;i<totalTime;i++){
            var process = 0;
            var min = 999999;
            for(j=1;j<=N;j++){
                if (p[j][0] <= i && p[j][1] < min && p[j][1] != 0){
                    min = p[j][1];
                    process = j;
                }
            }
            //chart allocate
            chart[i] = process;
            //process
            p[process][1]--;
            if(isNaN(p[process][4])) p[process][4] = i - p[process][0]; //First Response - AT -> RT++
            //calculate WT, TT
            for(j=1;j<=N;j++){
                if(p[j][0] <= i){
                    if(p[j][1] != 0){
                        p[j][3]++; //NOT FINISHED YET -> TT++
                        if(j!=process) p[j][2]++; //Wait Time -> WT++
                    }
                    else if(j == process){
                        p[j][3]++; //Special case: finished (p[j][1]==0) and reassigned to CPU -> TT++
                    }
                }
            }
        }

        callback(p, chart);
    }
}