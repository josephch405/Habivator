function Smiley(){

	var goodTasks = [];
	for (var i in taskArray){
		if (taskArray[i].karma>=1){
			goodTasks.push(taskArray[i]);
		}
	}
    var quotes = ["Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.</br> - Francis of Assisi",
    	"Today I choose life.</br> - Kevyn Aucoin",
    	"It is never too late to be what you might have been.<br> - George Eliot",
    	"Out of difficulties grow miracles.<br> - Jean de la Bruyere",
    	"When the sun is shining I can do anything; no mountain is too high, no trouble too difficult to overcome.<br>-Wilma Rudolph",
    	"Don't judge each day by the harvest you reap but by the seeds that you plant.<br> - Robert Louis Stevenson",
    	"We must never forget that the highest appreciation is not to utter words, but to live by them.<br> - John F. Kennedy",
    	"Yeah! Keep going!", "You are AWESOME!", "Carpe Diem!", "Enjoy the day!", "You're doing great!", "Remember to live every moment!",
    	"The secret of getting ahead is getting started. <br> - Mark Twain",
    	"What you get by achieving your goals is not as important as what you become by achieving your goals.<br> - Henry David Thoreau",
		"Expect problems and eat them for breakfast.<br> - Alfred A. Montapert",
		"Problems are not stop signs, they are guidelines.<br> - Robert H. Schuller",
		"Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.<br> - Helen Keller",
		"Strive not to be a success, but rather to be of value.<br> - Albert Einstein",
		"The best time to plant a tree was 20 years ago. The second best time is now.<br> - Chinese Proverb",
        "Always look on the bright side of life!<br> - Monty Python",
        "No matter what people tell you, words and ideas can change the world.<br> - Robin Williams",
        "Happiness is not something you postpone for the future; it is something you design for the present.<br> - Jim Rohn",
        "As knowledge increases, wonder deepens.<br> - Charles Morgan",
        "If we did all the things we are capable of, we would literally astound ourselves.<br> - Thomas A. Edison",
        "I am not afraid of tomorrow, for I have seen yesterday and I love today!<br> - William Allen White",
        "You change your life by changing your heart.<br> - Max Lucado",
        "When you have a dream, you've got to grab it and never let go.<br> - Carol Burnett", 

        "I believe that if one always looked at the skies, one would end up with wings.<br> - Gustave Flaubert",
        "Hope is but the dream of those who wake.<br> - Matthew Prior",
        "The best revenge is massive success.<br> - Frank Sinatra",
        "People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily.<br> - Zig Ziglar",
        "Life shrinks or expands in proportion to one’s courage.<br> - Anais Nin",
        "If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.<br> - Vincent Van Gogh",
        "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.<br> - Aristotle",
        "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you. - Jesus",
        "The only person you are destined to become is the person you decide to be.<br> - Ralph Waldo Emerson",
        "Fall seven times and stand up eight.<br> - Japanese Proverb",
        "Everything has beauty, but not everyone can see.<br> - Confucius",
        "How wonderful it is that nobody need wait a single moment before starting to improve the world.<br> - Anne Frank",
        "When I let go of what I am, I become what I might be.<br> - Lao Tzu",
        "The question isn’t who is going to let me; it’s who is going to stop me.<br> - Ayn Rand",
        "We learn something from everyone who passes through our lives.. Some lessons are painful, some are painless.. but, all are priceless.",
        "Rule #1 of life. Do what makes YOU happy.",
        "Life has two rules: #1 Never quit, #2 Always remember rule # 1.",
        "Your problem isn't the problem. Your reaction is the problem.",
        "You can do anything, but not everything.",
        "Innovation distinguishes between a leader and a follower.<br> - Steve Jobs"
    ]

    var tryThis = [[],[]];
    tryThis[0] = [
    	"Would you like to start",
    	"Why not try",
    	"Perhaps you could begin",
    	"Would it be fun to try"
    ]
    tryThis[1] = [
    "swimming","running","playing checkers",
    "learning Chinese","learning Spanish",
    "reading more","coding","playing the piano","singing",
    "drawing","cooking"
    ]

    var encourageChance = 0;
    var suggestAlterChance = 0;
    var suggestNewChance = 0;
    
    this.chooseText = function(){
    	var temp = Math.random();
    	if (temp<=encourageChance){
    		if (goodTasks.length>0)
    		{
    			return "You're doing well with <b>" + goodTasks[Math.floor(Math.random()*goodTasks.length)].name + "</b>!"
    		}
    		return this.pickQuote();
    	}
    	else if (temp - encourageChance <= suggestAlterChance){
    		return "you should blah blah blah";
    		//suggests changes to tasks
    	}
    	else if (temp - encourageChance - suggestAlterChance <= suggestNewChance){
    		return tryThis[0][Math.floor(Math.random()*tryThis[0].length)] + " <b>" + tryThis[1][Math.floor(Math.random()*tryThis[1].length)] + "</b>?";
    		//suggesting various new tasks
    	}
    	else{
    		return this.pickQuote();
    	}
    	console.log(temp - encourageGood);
    	return "wrong chance, at" + temp;

    }

    this.pickQuote = function(){
    	return quotes[Math.floor(Math.random()*quotes.length)];
    }


   
 
}