function Smiley(){
    var encourageGood = ["Yeah! Keep going!", "You are AWESOME!", "Carpe Diem!", "Enjoy the day!", "You're doing great!"]
    var totalEntries = encourageGood.length;
    
    this.chooseText = function(){
        return encourageGood[Math.floor(Math.random()*totalEntries)];
    }

}