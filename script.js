var MessageEngine = {

	text: null,
	messages: null,
	button: null,
	currentMessage: null,
	numberOfMessages: 0,
	messageIndex: 0,


	init: function() {

		if (!document.getElementById) { return; }

		MessageEngine.clearTextarea();
		
		MessageEngine.messages = new Array();

		document.getElementById("input").onclick = MessageEngine.createMessage;
		document.getElementById("text").onkeypress = MessageEngine.enterPress;
		document.getElementById("text").onclick = MessageEngine.onFocus;
		document.getElementById("text").onblur = MessageEngine.offFocus;
	},


	createMessage: function(e) {
	
		MessageEngine.text = document.getElementById("text").value;
		var newMessage = new Message(MessageEngine.text, new Date());
		
		//gör nytt objekt där radbrytningar bytts ut mot <br />, sparar i messages
		var m = new Message(newMessage.getHTMLText(), new Date());
		MessageEngine.messages[MessageEngine.messages.length] = m;

		MessageEngine.renderMessages();

		MessageEngine.clearTextarea();
		
		document.getElementById("text").blur();
	},


	enterPress: function(e) {
	
		//fix beroende på webbläsare
		if (!e) {
			var e = window.event;
		}
		var letter;
		if (!e.keyCode) {
			letter = e.charCode;
		}
		else { letter = e.keyCode; }

		if (letter == 13) { //enter = keyCode 13
			if (e.shiftKey != 1) {
				MessageEngine.createMessage();
				return false;
			}
		}
	},


	onFocus: function(e) {

		var addClass = document.getElementById("text");
		addClass.className = "write";
		document.getElementById("text").focus();
	},


	offFocus: function(e) {

		var removeClass = document.getElementById("text");
		removeClass.className = "";
		document.getElementById("text").blur();
	},


	renderMessages: function() {

		var i = 0;

		MessageEngine.numberOfMessages += 1;
		//skapar ett fönster för det skrivna meddelandet i div-taggen "old" 
		document.getElementById("nr").innerHTML = '<p>Antal meddelanden: ' + MessageEngine.numberOfMessages + '</p>';

		//rensar old-taggen och skriver ut igen för uppdaterad version
		var oldMessages = document.getElementById("old");
		oldMessages.innerHTML = "";

		for (i; i < MessageEngine.messages.length; ++i) {
			MessageEngine.renderMessage(i);
		}
	},


	renderMessage: function(messInd) {

		//hämtar text och tid för det inskickade element-id:t (messInd) i arrayen:
		var timeStamp = MessageEngine.messages[messInd].getTime().toLocaleTimeString();
		var messText = MessageEngine.messages[messInd].getText();
		
		//skapar det nya meddelandet i old-div-taggen
		var oldMessages = document.getElementById("old");
		oldMessages.innerHTML += '\n\t\t\t<div id="mess' + messInd + '" class="messWindow">\n\t\t\t\t<a href="#" class="close"><img id="close' + messInd + '" src="delete.png" alt="delete" width="16px" height="16px"/></a>\n\t\t\t\t<a href="#"  class="time"><img  id="time' + messInd + '" src="timedate.png" alt="timedate" width="16px" height="16px"/></a>\n\t\t\t\t<div><p class="mess">' + messText + '</p>\n\t\t\t\t<p class="tim">' + timeStamp + '</p></div>\n\t\t\t</div>\n\t\t';

		//tilldelar delete- och datumknapparna resp event
		var del = document.getElementById("old").getElementsByTagName("a");

		for (i = 0; i < del.length; i++) {
			if (i % 2 == 0) {
				del[i].onclick = MessageEngine.delMessage;
			}
			else {
				del[i].onclick = MessageEngine.messDate;
			}
		}
	},


	clearTextarea: function() {
		document.getElementById("text").value = "";
	},


	delMessage: function(e) {
	
		var closeId = this.firstChild.id;
		var closeIndex = closeId.slice(5);

		//letar upp index i messages och raderar efter bekräftelse från anv
		for (var i = 0; i < MessageEngine.messages.length; i++) {
			if (closeIndex == i) {
				var choice = confirm("Vill du verkligen radera meddelandet?");
				if (choice == true) {
					MessageEngine.messages.splice(i, 1);
				}
				else {
					return;
				}
			}
		}
		MessageEngine.numberOfMessages -= 2;

		MessageEngine.renderMessages();
	},


	messDate: function(e) {
	    //tar fram siffran i länkens id
	    var timeId = this.firstChild.id;
		var timeIndex = timeId.slice(4);

		//letar upp index i messages och visar tiden då meddelandet skapades
		for (var i = 0; i < MessageEngine.messages.length; i++) {
			if (timeIndex == i) {
				alert("Detta inlägg skapades " + MessageEngine.messages[i].setTime());
			}
		}
	}


}
window.onload = MessageEngine.init;