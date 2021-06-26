function Dollars(aud){
	if(aud>=0){
    var e = aud*0.6602389;
    return e;
    } 
    else
    return ""
}
function Euros(euros){
	if(euros>=0){
	var dollars = euros/0.6602389;
    return dollars;
    }
    else
    return""
}
