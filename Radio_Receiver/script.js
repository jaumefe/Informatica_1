function frequency(L,C) {
  var g = 1000/(2*Math.PI*Math.sqrt(L*C));
  return g;
}
function restLoad(L,C,f,R,V) {
  var h =R*V/ Math.sqrt(R*R+(2*Math.PI*f*L-1000000/(2*Math.PI*f*C))*(2*Math.PI*f*L-1000000/(2*Math.PI*f*C)))
  return h;
}
