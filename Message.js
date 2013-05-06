function Message(message, time) {

	this.message = message;
	this.time = time;
}

Message.prototype.toString = function() {
	return this.message + " (" + this.time + ")";
}

Message.prototype.getText = function() {
	return this.message;
}

Message.prototype.setText = function() {
	this.message = "ange ny text: ";
	alert(this.message);
}

Message.prototype.getTime = function() {
	return this.time;
}

Message.prototype.setTime = function() {
	var dateText =this.time.toLocaleString();
	var index = dateText.lastIndexOf(" ");
	var date = dateText.slice(0, index);
	var time = dateText.slice(index+1, dateText.length);
	var dateTime = ""+date+" klockan "+time+"";
	return dateTime;
}

Message.prototype.getHTMLText = function() {
    return this.message.replace(/[\n\r]/g, "<br />");
}
 
 